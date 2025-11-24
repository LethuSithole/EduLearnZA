const Topic = require("../models/Topic");

exports.getTopicsByCategory = async (req, res) => {
  try {
    const topics = await Topic.find({
      category: req.params.categoryId,
      isActive: true,
    })
      .populate("category", "name")
      .populate("subject", "name icon color")
      .sort("order");

    res.json({
      success: true,
      count: topics.length,
      data: topics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getTopic = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id)
      .populate("category", "name")
      .populate("subject", "name icon color");

    if (!topic) {
      return res.status(404).json({
        success: false,
        error: "Topic not found",
      });
    }

    res.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const topic = await Topic.create(req.body);
    await topic.populate("category", "name");
    await topic.populate("subject", "name icon color");

    res.status(201).json({
      success: true,
      data: topic,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .populate("category", "name")
      .populate("subject", "name icon color");

    if (!topic) {
      return res.status(404).json({
        success: false,
        error: "Topic not found",
      });
    }

    res.json({
      success: true,
      data: topic,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        error: "Topic not found",
      });
    }

    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
