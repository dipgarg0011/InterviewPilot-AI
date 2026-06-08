const { GoogleGenAI, Type } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

// Gemini-compatible response schema (OpenAPI subset — no $schema/$ref/definitions).
const interviewReportResponseSchema = {
  type: Type.OBJECT,
  properties: {
    matchScore: {
      type: Type.NUMBER,
      description: "How well the candidate matches the job, 1-100.",
    },
    technicalQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          intention: { type: Type.STRING },
          answer: { type: Type.STRING },
        },
        required: ["question", "intention", "answer"],
      },
    },
    behavioralQuestions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          intention: { type: Type.STRING },
          answer: { type: Type.STRING },
        },
        required: ["question", "intention", "answer"],
      },
    },
    skillGaps: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          skill: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ["low", "mid", "high"] },
        },
        required: ["skill", "severity"],
      },
    },
    preparationPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.NUMBER },
          focus: { type: Type.STRING },
          tasks: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["day", "focus", "tasks"],
      },
    },
  },
  required: [
    "matchScore",
    "technicalQuestions",
    "behavioralQuestions",
    "skillGaps",
    "preparationPlan",
  ],
};

function safeParseJson(text) {
  if (!text) throw new Error("Empty AI response");
  try {
    return JSON.parse(text);
  } catch (_) {
    // Strip markdown fences if present and try again.
    const cleaned = text
      .replace(/^\s*```(?:json)?/i, "")
      .replace(/```\s*$/i, "")
      .trim();
    const first = cleaned.indexOf("{");
    const last = cleaned.lastIndexOf("}");
    if (first !== -1 && last !== -1) {
      return JSON.parse(cleaned.slice(first, last + 1));
    }
    throw new Error("AI response was not valid JSON");
  }
}

async function generateInterviewreport({ resume, selfdescription, jobdescription }) {
  const prompt = `You are an expert interview coach. Generate a professional interview assessment report.

Resume:
${resume}

Self Description:
${selfdescription}

Job Description:
${jobdescription}

Return ONLY a JSON object that strictly matches this structure:
{
  "matchScore": number (1-100),
  "technicalQuestions": [{ "question": string, "intention": string, "answer": string }],
  "behavioralQuestions": [{ "question": string, "intention": string, "answer": string }],
  "skillGaps": [{ "skill": string, "severity": "low" | "mid" | "high" }],
  "preparationPlan": [{ "day": number, "focus": string, "tasks": [string] }]
}

Rules:
- Provide 5 technical and 5 behavioral questions.
- Provide at least 3 skill gaps.
- Provide a 7-day preparation plan.
- Be concise; use point-wise bullets inside string fields where useful.
- Do not include markdown, code fences, or any text outside the JSON.`;

  const models = ["gemini-2.5-flash", "gemini-2.0-flash", "gemini-2.5-flash-lite"];
  let lastErr;
  for (const model of models) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportResponseSchema,
          },
        });
        return safeParseJson(response.text);
      } catch (err) {
        lastErr = err;
        const msg = String(err && err.message);
        const retriable = /503|UNAVAILABLE|overloaded|high demand|429|RESOURCE_EXHAUSTED/i.test(msg);
        if (!retriable) throw err;
        await new Promise((r) => setTimeout(r, 1500 * (attempt + 1)));
      }
    }
  }
  throw lastErr;
}

module.exports = {
  generateInterviewreport,
};
