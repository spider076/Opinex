const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getTrendingTopics() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // - For each topic, generate a fun and thought-provoking quiz-style question.
    // - Provide 2–4 multiple choice options for each question.

    const prompt = `
    You are a trending topic quiz generator.
    
    Your job is to:
    - Fetch the latest trending global topics from Google Trends specifially from technology and sports field/sector .
    - Keep questions short, clear, and engaging for Gen Z audiences.
    - Format the result as JSON only.
    
    Use the following JSON format:
    {
      "topic": "Technology",
      "question": "iPhone 16: Biggest expected upgrade?", 
      "options": ["Yes", "No"],
    }
   
    Return only the JSON object, no explanation or markdown. Keep it short and ready to be used in a quiz app.
    `;

    // {
    //   "trending_quiz": [
    //     {
    //       "topic": "Bitcoin",
    //       "question": "Will Bitcoin reach $1M by the end of 2030?",
    //       "options": ["Yes", "No"]
    //     },
    //     {
    //       "topic": "AI in Healthcare",
    //       "question": "What role will AI most likely play in hospitals by 2026?",
    //       "options": ["Diagnosis", "Surgery", "Scheduling", "No Role"]
    //     }
    //   ]
    // }

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from response (Gemini might wrap it in markdown)
    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1].trim());
    }

    return JSON.parse(text); // fallback if no markdown wrapper
  } catch (err) {
    console.error("Gemini Error:", err.message);
    return { error: "Coundn't not fetch trending topic questions" };
  }
}

module.exports = { getTrendingTopics };
