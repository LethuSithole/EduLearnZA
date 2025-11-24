const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/subjects", require("./routes/subjects"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/topics", require("./routes/topics"));
app.use("/api/questions", require("./routes/questions"));

// Welcome route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to EduLearnZA Quiz API",
    version: "1.0.0",
    endpoints: {
      subjects: "/api/subjects",
      categories: "/api/categories",
      topics: "/api/topics",
      questions: "/api/questions",
    },
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || "Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
