const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  grade: {
    type: String,
    required: true,
  },
  testHistory: [
    {
      topic: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
      score: Number,
      totalQuestions: Number,
      percentage: Number,
      completedAt: {
        type: Date,
        default: Date.now,
      },
      questionsUsed: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Question",
        },
      ],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
