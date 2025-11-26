const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

// Get questions by subject, grade, and topic
router.get("/:subject/:grade/:topic", async (req, res) => {
  try {
    const { subject, grade, topic } = req.params;

    const questions = await Question.find({
      subject,
      grade,
      topic,
    }).limit(100);

    res.json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching questions",
    });
  }
});

// Get all questions for a subject and grade
router.get("/:subject/:grade", async (req, res) => {
  try {
    const { subject, grade } = req.params;

    const questions = await Question.find({
      subject,
      grade,
    }).limit(100);

    res.json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      error: "Server error while fetching questions",
    });
  }
});

module.exports = router;
