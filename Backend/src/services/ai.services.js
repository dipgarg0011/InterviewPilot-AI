const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const interviewReportSchema = z.object({
  score: z
    .number()
    .describe(
      "How well the candidate profile matches the job requirements, on a scale of 1 to 100.",
    ),
  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question asked during the interview."),
        answer: z
          .string()
          .describe(
            "How to answer the technical question effectively in the interview.",
          ),
      }),
    )
    .describe("A list of technical questions, their answers."),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question asked during the interview."),
        answer: z
          .string()
          .describe(
            "How to answer the behavioral question effectively in the interview.",
          ),
      }),
    )
    .describe("A list of behavioral questions and their answers."),

  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill that the candidate is lacking."),
        gapDescription: z
          .string()
          .describe(
            "A description of the skill gap and how it can be addressed.",
          ),
      }),
    )
    .describe("A list of skill gaps identified during the interview."),

  futurePlans: z
    .array(
      z.object({
        day: z.number().describe("The day number in the future plan."),
        planDescription: z
          .string()
          .describe(
            "A description of the future plan for improving skills and preparing for future interviews.",
          ),
      }),
    )
    .describe(
      "A list of future plans for the candidate to improve their skills and prepare for future interviews.",
    ),
});

async function generateInterviewreport({
  resume,
  selfdescription,
  jobdescription,
}) {
  const prompt = `Generate a professional interview assessment report for a candidate based on the following information:

Resume:
${resume}

Self Description:
${selfdescription}

Job Description:
${jobdescription}

Analyze how well the candidate's skills, experience, projects, and background align with the job requirements.

The report should include:

* A match score (1-100) with a brief justification.
* Key strengths of the candidate.
* Technical interview questions with ideal answers.
* Behavioral interview questions with ideal answers.
* Skill gaps or missing requirements.
* Actionable recommendations for improvement and future interview preparation.
* A final hiring recommendation.

Important Instructions:

* Keep all responses concise and point-wise.
* Use bullet points instead of long paragraphs.
* Be realistic and constructive in the evaluation.
* Base the assessment on the provided information only.
* Return ONLY valid JSON matching the provided schema.
* Do not include markdown, code blocks, or any text outside the JSON response.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeTime: "application/json",
      responseSchema: zodToJsonSchema(interviewReportSchema),
    },
  });
  return json.parse(response.text);
}

module.exports = {
  generateInterviewreport,
};
