const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/edulearnza", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Question Schema
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Medium",
  },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Question = mongoose.model("Question", questionSchema);

// User Progress Schema
const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  topic: { type: String, required: true },
  score: { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  answers: [{ questionId: String, userAnswer: String, correct: Boolean }],
  completedAt: { type: Date, default: Date.now },
});

const Progress = mongoose.model("Progress", progressSchema);

// Routes

// Get all subjects
app.get("/api/subjects", async (req, res) => {
  try {
    const subjects = await Question.distinct("subject");
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get topics by subject
app.get("/api/topics", async (req, res) => {
  try {
    const { subject } = req.query;
    const topics = await Question.distinct("topic", { subject });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get questions by topic
app.get("/api/questions", async (req, res) => {
  try {
    const { subject, topic, limit = 100 } = req.query;
    const questions = await Question.find({ subject, topic })
      .limit(parseInt(limit))
      .select("-__v");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit quiz result
app.post("/api/results", async (req, res) => {
  try {
    const { userId, subject, topic, score, totalQuestions, answers } = req.body;
    const progress = new Progress({
      userId,
      subject,
      topic,
      score,
      totalQuestions,
      answers,
    });
    await progress.save();
    res.json({ success: true, progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user progress
app.get("/api/progress/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await Progress.find({ userId }).sort({ completedAt: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed sample questions (for testing)
app.post("/api/seed", async (req, res) => {
  try {
    const sampleQuestions = [];

    // Mathematics - Algebra
    for (let i = 1; i <= 100; i++) {
      sampleQuestions.push({
        question: `Algebra Question ${i}: Solve for x in the equation: 2x + ${i} = ${
          i * 2
        }`,
        options: [`x = ${i}`, `x = ${i - 1}`, `x = ${i + 1}`, `x = ${i * 2}`],
        correctAnswer: "A",
        difficulty: i % 3 === 0 ? "Hard" : i % 2 === 0 ? "Medium" : "Easy",
        subject: "Mathematics",
        topic: "Algebra",
      });
    }

    // Science questions
    for (let i = 1; i <= 100; i++) {
      sampleQuestions.push({
        question: `Science Question ${i}: What is the chemical symbol for ${
          i % 2 === 0 ? "Oxygen" : "Hydrogen"
        }?`,
        options: ["O", "H", "C", "N"],
        correctAnswer: i % 2 === 0 ? "A" : "B",
        difficulty: i % 3 === 0 ? "Hard" : i % 2 === 0 ? "Medium" : "Easy",
        subject: "Science",
        topic: "Chemistry",
      });
    }

    await Question.insertMany(sampleQuestions);
    res.json({ success: true, count: sampleQuestions.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
