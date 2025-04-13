require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const { getTrendingTopics } = require("./services/geminiService");

const app = express();
const PORT = process.env.PORT || 3000;

let latestTopic = null;

// Fetch on startup
const fetchAndStoreTopics = async () => {
  const result = await getTrendingTopics();
  console.log("result ; ", result);
  latestTopic = result[0] || [];
  console.log("Updated trending topics at", new Date().toLocaleString());
};

fetchAndStoreTopics();

// Schedule to run every hour
cron.schedule("0 * * * *", fetchAndStoreTopics);

// API endpoint to get trending topics
app.get("/trending", (req, res) => {
  res.json(latestTopic);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
