const express = require("express");
const router = express.Router();
const Question = require("../models/Question");
const {
  getTestQuestions,
  submitTestAnswers,
  createQuestion,
  bulkCreateQuestions,
  updateQuestion,
  deleteQuestion,
  getQuestionStats,
} = require("../controllers/questionController");
const { protect } = require("../middleware/authMiddleware");

// Public routes (with optional auth)
router.get("/test/:topicId", protect, getTestQuestions);
router.post("/submit", protect, submitTestAnswers);

// Admin routes
router.post("/", createQuestion);
router.post("/bulk", bulkCreateQuestions);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);
router.get("/:id/stats", getQuestionStats);

// GET all questions with filters
router.get("/api/questions", async (req, res) => {
  try {
    const { subject, topic, difficulty, limit = 100 } = req.query;

    const filter = {};

    if (subject) {
      filter.subject = subject;
    }

    if (topic) {
      filter.topic = topic;
    }

    if (difficulty) {
      filter.difficulty = difficulty;
    }

    console.log("Fetching questions with filter:", filter);

    const questions = await Question.find(filter)
      .limit(parseInt(limit))
      .lean();

    console.log(`Found ${questions.length} questions`);

    res.json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch questions",
      message: error.message,
    });
  }
});

// GET questions count by subject
router.get("/api/questions/count", async (req, res) => {
  try {
    const counts = await Question.aggregate([
      {
        $group: {
          _id: "$subject",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(counts);
  } catch (error) {
    console.error("Error counting questions:", error);
    res.status(500).json({
      success: false,
      error: "Failed to count questions",
    });
  }
});

// GET question by ID
router.get("/api/questions/:id", async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    res.json(question);
  } catch (error) {
    console.error("Error fetching question:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch question",
    });
  }
});

module.exports = router;
