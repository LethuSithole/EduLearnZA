const express = require("express");
const router = express.Router();
const {
  getTopicsByCategory,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topicController");

router.get("/category/:categoryId", getTopicsByCategory);
router.get("/:id", getTopic);
router.post("/", createTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
