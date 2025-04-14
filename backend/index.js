require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const { getTrendingTopics } = require("./services/redditService");

const app = express();
const PORT = process.env.PORT || 3000;

// Store question history
let questionHistory = [];
let currentQuestion = null;

const fetchAndStoreTopics = async () => {
  try {
    // Pass previous question for winner analysis
    const previousQuestion = currentQuestion;
    const result = await getTrendingTopics(previousQuestion);

    if (result.error) {
      console.error("Failed to fetch topics:", result.error);
      return;
    }

    // Update current question
    currentQuestion = {
      topic: result.topic,
      question: result.question,
      options: result.options,
    };

    // Store in history
    questionHistory.push({
      id: questionHistory.length,
      topic: result.topic,
      question: result.question,
      options: result.options,
      timestamp: new Date().toISOString(),
      winner: result.previousQuestion?.winner || null

      // winner: result.previousQuestion ? result.previousQuestion.winner : null,
    });

    // Limit history to 24 hours
    questionHistory = questionHistory.filter(
      (q) => new Date(q.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    );

    console.log("Updated trending topics at", new Date().toLocaleString());
    console.log("Current Question:", currentQuestion);
    console.log("Previous Winner:", result.previousQuestion?.winner || "None");
  } catch (err) {
    console.error("Error in fetchAndStoreTopics:", err.message);
  }
};

// Fetch on startup
fetchAndStoreTopics();

// Run every hour
// cron.schedule("0 * * * *", fetchAndStoreTopics);
cron.schedule("*/1 * * * *", fetchAndStoreTopics);

// Get trending question
app.get("/trending", (req, res) => {
  if (currentQuestion) {
    res.json({
      topic: currentQuestion.topic,
      question: currentQuestion.question,
      options: currentQuestion.options,
      previousQuestion:
        questionHistory.length > 1
          ? {
              question: questionHistory[questionHistory.length - 2].question,
              winner: questionHistory[questionHistory.length - 2].winner,
            }
          : null,
    });
  } else {
    res.status(503).json({ error: "No trending topic available" });
  }
});

// Get question history
app.get("/history", (req, res) => {
  res.json(questionHistory);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
