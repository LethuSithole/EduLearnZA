const express = require("express");
const router = express.Router();
const {
  getTopicsByCategory,
  getTopic,
  createTopic,
  updateTopic,
  deleteTopic,
} = require("../controllers/topicController");

// Create a new topic
router.post("/", createTopic);

// Get all topics
router.get("/", getTopicsByCategory);

// Get a topic by ID
router.get("/:id", getTopic);

// Update a topic by ID
router.put("/:id", updateTopic);

// Delete a topic by ID
router.delete("/:id", deleteTopic);

module.exports = router;
