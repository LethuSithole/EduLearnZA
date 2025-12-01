const express = require("express");
const router = express.Router();
const Progress = require("../models/Progress");

// Save progress
router.post("/", async (req, res) => {
  try {
    const { userId, subject, score, totalQuestions, percentage } = req.body;

    const progress = new Progress({
      userId,
      subject,
      score,
      totalQuestions,
      percentage,
      date: new Date(),
    });

    await progress.save();

    res.status(201).json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Save progress error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to save progress",
      message: error.message,
    });
  }
});

// Get user progress
router.get("/user/:userId", async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.params.userId })
      .sort({ date: -1 })
      .limit(50);

    res.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Get progress error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get progress",
      message: error.message,
    });
  }
});

// Get progress by subject
router.get("/user/:userId/subject/:subject", async (req, res) => {
  try {
    const progress = await Progress.find({
      userId: req.params.userId,
      subject: req.params.subject,
    }).sort({ date: -1 });

    res.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error("Get subject progress error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get subject progress",
      message: error.message,
    });
  }
});

// Delete progress
router.delete("/:id", async (req, res) => {
  try {
    const progress = await Progress.findByIdAndDelete(req.params.id);

    if (!progress) {
      return res.status(404).json({
        success: false,
        error: "Progress not found",
      });
    }

    res.json({
      success: true,
      message: "Progress deleted successfully",
    });
  } catch (error) {
    console.error("Delete progress error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete progress",
      message: error.message,
    });
  }
});

module.exports = router;
