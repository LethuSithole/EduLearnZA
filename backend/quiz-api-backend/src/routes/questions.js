const express = require("express");
const router = express.Router();
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

module.exports = router;
