const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey:process.env.GOOGLE_API_KEY
})

async function generateResponse() {
    try {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: "hello gemini! what is interview?"
    });

    console.log(response.text);
}
catch(error){
    console.error("Error generating response:", error);
}
    }
    

module.exports = {
    generateResponse
}