const snoowrap = require("snoowrap");
const Sentiment = require("sentiment");

const reddit = new snoowrap({
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  username: process.env.REDDIT_USERNAME,
  password: process.env.REDDIT_PASSWORD,
  userAgent: process.env.REDDIT_USER_AGENT,
});

const SUBREDDITS = {
  Technology: ["technology", "gadgets", "tech", "futurology"],
  Sports: ["sports", "nba", "soccer", "nfl"],
};

const sentiment = new Sentiment();
const usedPostIds = new Set(); // to avoid duplicates

function extractKeywords(title) {
  return title
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .split(" ")
    .filter((word) => word.length > 3)
    .slice(0, 5)
    .join(" ");
}

async function analyzeSentiment(subreddit, query) {
  try {
    let scores = { positive: 0, negative: 0, neutral: 0 };

    const posts = await reddit.getSubreddit(subreddit).search({
      query,
      sort: "relevance",
      time: "week",
      limit: 5,
    });

    for (const post of posts) {
      const comments = await post.comments.fetchAll({ limit: 50 });
      for (const comment of comments) {
        const analysis = sentiment.analyze(comment.body);
        if (analysis.score > 0) scores.positive++;
        else if (analysis.score < 0) scores.negative++;
        else scores.neutral++;
      }
    }

    if (scores.positive > scores.negative && scores.positive > scores.neutral)
      return "Yes";
    if (scores.negative > scores.positive && scores.negative > scores.neutral)
      return "No";

    return "Maybe";
  } catch (err) {
    console.error("Sentiment Error:", err.message);
    return "Maybe";
  }
}

async function getTrendingTopics(previousQuestion = null) {
  try {
    const posts = [];

    for (const sector in SUBREDDITS) {
      for (const subreddit of SUBREDDITS[sector]) {
        const hotPosts = await reddit.getSubreddit(subreddit).getHot({
          limit: 10,
        });

        hotPosts.forEach((post) => {
          if (!usedPostIds.has(post.id)) {
            posts.push({ post, subreddit, sector });
          }
        });
      }
    }

    if (!posts.length) return { error: "No new posts found" };

    const topPost = posts.reduce((a, b) =>
      a.post.score > b.post.score ? a : b
    );
    usedPostIds.add(topPost.post.id);

    const { post, subreddit, sector } = topPost;
    const title = post.title;
    const topic = sector;
    const question = title;
    const options = ["Yes", "No", "Maybe"];
    const query = extractKeywords(title);

    let previousWinner = null;
    if (previousQuestion?.question) {
      const prevSubreddit = previousQuestion.question.match(/#r\/(\w+)/)?.[1] || subreddit;
      const prevQuery = extractKeywords(previousQuestion.question);
      previousWinner = await analyzeSentiment(prevSubreddit, prevQuery);
    }

    return {
      topic,
      question,
      options,
      previousQuestion:
        previousQuestion && previousWinner
          ? {
              question: previousQuestion.question,
              winner: previousWinner,
            }
          : null,
    };
  } catch (err) {
    console.error("Reddit API Error:", err.message);
    return { error: "Could not fetch trending topics" };
  }
}

module.exports = { getTrendingTopics };
