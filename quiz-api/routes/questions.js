const express = require("express");
const router = express.Router();
const {
  getTestQuestions,
  submitTestAnswers,
  createQuestion,
  bulkCreateQuestions,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");

router.get("/test/:topicId", getTestQuestions);
router.post("/submit", submitTestAnswers);
router.post("/", createQuestion);
router.post("/bulk", bulkCreateQuestions);
router.put("/:id", updateQuestion);
router.delete("/:id", deleteQuestion);

module.exports = router;
