const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const axios = require("axios");
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
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ success: false, error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    );
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: "Invalid token" });
  }
};

// Routes

// Sign Up
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { email, password, displayName, grade } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "This email is already registered",
      });
    }

    // Validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password should be at least 6 characters",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      email,
      password: hashedPassword,
      displayName,
      grade,
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" }
    );

    res.status(201).json({
      success: true,
      token,
      user: {
        uid: user._id,
        email: user.email,
        displayName: user.displayName,
        grade: user.grade,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred during signup",
    });
  }
});

// Login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "30d" }
    );

    res.json({
      success: true,
      token,
      user: {
        uid: user._id,
        email: user.email,
        displayName: user.displayName,
        grade: user.grade,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred during login",
    });
  }
});

// Get Current User
app.get("/api/auth/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    res.json({
      success: true,
      user: {
        uid: user._id,
        email: user.email,
        displayName: user.displayName,
        grade: user.grade,
      },
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
});

// Update User Profile
app.put("/api/auth/profile", verifyToken, async (req, res) => {
  try {
    const { displayName } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { displayName },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user: {
        uid: user._id,
        email: user.email,
        displayName: user.displayName,
        grade: user.grade,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update profile",
    });
  }
});

// Update Grade
app.put("/api/auth/grade", verifyToken, async (req, res) => {
  try {
    const { grade } = req.body;

    const user = await User.findByIdAndUpdate(
      req.userId,
      { grade },
      { new: true }
    ).select("-password");

    res.json({
      success: true,
      user: {
        uid: user._id,
        email: user.email,
        displayName: user.displayName,
        grade: user.grade,
      },
    });
  } catch (error) {
    console.error("Update grade error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update grade",
    });
  }
});

// Password Reset Request
app.post("/api/auth/reset-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "No account found with this email",
      });
    }

    // In production, send email with reset link
    // For now, just return success
    res.json({
      success: true,
      message: "Password reset email sent",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({
      success: false,
      error: "An error occurred",
    });
  }
});

// Chatbot Route
app.post("/api/chatbot", async (req, res) => {
  try {
    const { message, context } = req.body;

    const systemPrompt = `You are EduBot, an AI tutor for South African high school students (Grades 8-12). 
    You help with:
    - Mathematics (Algebra, Calculus, Geometry, Trigonometry, Statistics)
    - Physical Sciences (Physics, Chemistry)
    - Life Sciences (Biology)
    - Study techniques and exam preparation
    
    Student context: Grade ${context?.grade || "unknown"}, Subjects: ${
      context?.subjects?.join(", ") || "unknown"
    }
    
    Be encouraging, clear, and educational. Break down complex topics. Use examples when helpful.
    Keep responses concise but thorough.`;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error("Chatbot error:", error.response?.data || error.message);

    if (error.response?.status === 429) {
      return res
        .status(429)
        .json({ error: "Too many requests. Please try again in a moment." });
    }

    res.status(500).json({
      error: "Failed to get response. Please try again.",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
