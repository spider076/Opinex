  const { GoogleGenerativeAI } = require("@google/generative-ai");

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  async function getTrendingTopics() {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro-preview-03-25" });

      // - For each topic, generate a fun and thought-provoking quiz-style question.
      // - Provide 2–4 multiple choice options for each question.
      const prompt = `
      You are a trending quiz generator.
      
      Instructions:
      - Fetch trending global topics from Google Trends (technology and sports only).
      - Create short, clear, Gen Z-friendly questions.
      - Return a JSON object only, no markdown or explanation.
      - Use this exact format:
      {
        "topic": "Technology",
        "question": "iPhone 16: Biggest expected upgrade?",
        "options": ["Yes", "No"]
      }
      
      Rules:
      1. No emojis or special characters.
      2. Keep the full JSON under 170 bytes. Shorten the question/options text if needed.
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
