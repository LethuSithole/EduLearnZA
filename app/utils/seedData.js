// utils/seedData.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Subject = require("../models/Subject");
const Category = require("../models/Category");
const Topic = require("../models/Topic");
const Question = require("../models/Question");

dotenv.config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // Clear existing data
    await Subject.deleteMany();
    await Category.deleteMany();
    await Topic.deleteMany();
    await Question.deleteMany();

    console.log("🗑️  Cleared existing data");

    // Create Mathematics subject
    const mathSubject = await Subject.create({
      name: "Mathematics",
      description: "Grade 12 Mathematics",
      icon: "🔢",
      color: "#2196F3",
    });

    // Create Algebra category
    const algebraCategory = await Category.create({
      name: "Algebra",
      subject: mathSubject._id,
      description: "Algebraic expressions and equations",
      order: 1,
    });

    // Create Quadratic Equations topic
    const quadraticTopic = await Topic.create({
      name: "Quadratic Equations",
      category: algebraCategory._id,
      subject: mathSubject._id,
      description: "Solving quadratic equations",
      difficulty: "medium",
      order: 1,
    });

    // Create 100 sample questions for Quadratic Equations
    const questions = [];
    for (let i = 1; i <= 100; i++) {
      questions.push({
        topic: quadraticTopic._id,
        category: algebraCategory._id,
        subject: mathSubject._id,
        questionText: `Solve the quadratic equation: x² + ${i}x + ${i * 2} = 0`,
        options: [
          `x = ${i} or x = ${i * 2}`,
          `x = ${-i} or x = ${-i * 2}`,
          `x = ${i / 2} or x = ${i}`,
          `No real solutions`,
        ],
        correctAnswer: `x = ${-i} or x = ${-i * 2}`,
        explanation: `Use the quadratic formula to solve the equation.`,
        difficulty: i <= 30 ? "easy" : i <= 70 ? "medium" : "hard",
        points: 1,
      });
    }

    await Question.insertMany(questions);
    await Topic.findByIdAndUpdate(quadraticTopic._id, {
      totalQuestions: 100,
    });

    console.log("✅ Successfully seeded 100 questions for Quadratic Equations");

    // Create Science subject
    const scienceSubject = await Subject.create({
      name: "Physical Science",
      description: "Grade 12 Physical Science",
      icon: "🧪",
      color: "#4CAF50",
    });

    const physicsCategory = await Category.create({
      name: "Physics",
      subject: scienceSubject._id,
      description: "Physical principles and concepts",
      order: 1,
    });

    const mechanicsTopic = await Topic.create({
      name: "Mechanics",
      category: physicsCategory._id,
      subject: scienceSubject._id,
      description: "Motion, forces, and energy",
      difficulty: "medium",
      order: 1,
    });

    console.log("✅ Database seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedData();
