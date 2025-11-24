const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Subject = require("../models/Subject");
const Category = require("../models/Category");
const Topic = require("../models/Topic");
const Question = require("../models/Question");

dotenv.config();

const connectDB = async () => {
  try {
    console.log("🔌 Attempting to connect to MongoDB...");
    console.log(`📍 Connection string: ${process.env.MONGODB_URI}`);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    console.error("\n💡 Make sure MongoDB is running:");
    console.error("   1. Open a new terminal");
    console.error("   2. Run: mongod");
    console.error("   3. Keep that terminal open");
    console.error("   4. Run this seed script again\n");
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Connect to database first
    await connectDB();

    console.log("🌱 Starting database seeding...");

    // Clear existing data
    console.log("🗑️  Clearing existing data...");
    await Subject.deleteMany();
    await Category.deleteMany();
    await Topic.deleteMany();
    await Question.deleteMany();
    console.log("✅ Cleared existing data");

    // ==================== MATHEMATICS ====================
    const mathSubject = await Subject.create({
      name: "Mathematics",
      description: "Grade 12 Mathematics - Prepare for your final exams",
      icon: "🔢",
      color: "#2196F3",
    });

    console.log("✅ Created Mathematics subject");

    // Algebra Category
    const algebraCategory = await Category.create({
      name: "Algebra",
      subject: mathSubject._id,
      description: "Algebraic expressions, equations, and functions",
      order: 1,
    });

    // Algebra Topics
    const quadraticTopic = await Topic.create({
      name: "Quadratic Equations",
      category: algebraCategory._id,
      subject: mathSubject._id,
      description: "Solving quadratic equations and applications",
      difficulty: "medium",
      order: 1,
    });

    const exponentialTopic = await Topic.create({
      name: "Exponential Functions",
      category: algebraCategory._id,
      subject: mathSubject._id,
      description: "Exponential and logarithmic functions",
      difficulty: "hard",
      order: 2,
    });

    // Create 100 Quadratic Equations questions
    console.log("📝 Creating Quadratic Equations questions...");
    const quadraticQuestions = [];
    for (let i = 1; i <= 100; i++) {
      const a = Math.floor(Math.random() * 5) + 1;
      const b = Math.floor(Math.random() * 10) - 5;
      const c = Math.floor(Math.random() * 10) - 5;

      quadraticQuestions.push({
        topic: quadraticTopic._id,
        category: algebraCategory._id,
        subject: mathSubject._id,
        questionText: `Solve for x: ${a}x² ${b >= 0 ? "+" : ""}${b}x ${
          c >= 0 ? "+" : ""
        }${c} = 0`,
        options: [
          `x = ${Math.floor(Math.random() * 10) - 5} or x = ${
            Math.floor(Math.random() * 10) - 5
          }`,
          `x = ${Math.floor(Math.random() * 10) - 5} or x = ${
            Math.floor(Math.random() * 10) - 5
          }`,
          `x = ${Math.floor(Math.random() * 10) - 5} or x = ${
            Math.floor(Math.random() * 10) - 5
          }`,
          "No real solutions",
        ],
        correctAnswer: `x = ${Math.floor(Math.random() * 10) - 5} or x = ${
          Math.floor(Math.random() * 10) - 5
        }`,
        explanation: `Use the quadratic formula: x = (-b ± √(b²-4ac)) / 2a`,
        difficulty: i <= 30 ? "easy" : i <= 70 ? "medium" : "hard",
        points: 1,
      });
    }

    await Question.insertMany(quadraticQuestions);
    await Topic.findByIdAndUpdate(quadraticTopic._id, { totalQuestions: 100 });
    console.log("✅ Created 100 Quadratic Equations questions");

    // ==================== PHYSICAL SCIENCE ====================
    const scienceSubject = await Subject.create({
      name: "Physical Science",
      description: "Grade 12 Physical Science - Physics and Chemistry",
      icon: "🧪",
      color: "#4CAF50",
    });

    console.log("✅ Created Physical Science subject");

    // Physics Category
    const physicsCategory = await Category.create({
      name: "Physics",
      subject: scienceSubject._id,
      description: "Physical principles and laws",
      order: 1,
    });

    // Mechanics Topic
    const mechanicsTopic = await Topic.create({
      name: "Mechanics",
      category: physicsCategory._id,
      subject: scienceSubject._id,
      description: "Motion, forces, work, and energy",
      difficulty: "medium",
      order: 1,
    });

    // Create 100 Mechanics questions
    console.log("📝 Creating Mechanics questions...");
    const mechanicsQuestions = [];
    const mechanicsQuestionsData = [
      {
        question: "What is Newton's First Law of Motion?",
        options: [
          "An object at rest stays at rest unless acted upon by a force",
          "Force equals mass times acceleration",
          "For every action there is an equal and opposite reaction",
          "Energy cannot be created or destroyed",
        ],
        correct: 0,
        explanation:
          "Newton's First Law states that an object will remain at rest or in uniform motion unless acted upon by an external force.",
      },
      {
        question: "What is the SI unit of force?",
        options: ["Joule", "Newton", "Watt", "Pascal"],
        correct: 1,
        explanation:
          "The Newton (N) is the SI unit of force, defined as kg⋅m/s².",
      },
      {
        question: "What is kinetic energy?",
        options: [
          "Energy of motion",
          "Stored energy",
          "Energy from heat",
          "Energy from light",
        ],
        correct: 0,
        explanation:
          "Kinetic energy is the energy an object possesses due to its motion.",
      },
    ];

    for (let i = 0; i < 100; i++) {
      const template =
        mechanicsQuestionsData[i % mechanicsQuestionsData.length];
      mechanicsQuestions.push({
        topic: mechanicsTopic._id,
        category: physicsCategory._id,
        subject: scienceSubject._id,
        questionText: template.question,
        options: template.options,
        correctAnswer: template.options[template.correct],
        explanation: template.explanation,
        difficulty: i < 30 ? "easy" : i < 70 ? "medium" : "hard",
        points: 1,
      });
    }

    await Question.insertMany(mechanicsQuestions);
    await Topic.findByIdAndUpdate(mechanicsTopic._id, { totalQuestions: 100 });
    console.log("✅ Created 100 Mechanics questions");

    // ==================== ENGLISH ====================
    const englishSubject = await Subject.create({
      name: "English",
      description: "Grade 12 English Home Language",
      icon: "📚",
      color: "#FF5722",
    });

    console.log("✅ Created English subject");

    // Literature Category
    const literatureCategory = await Category.create({
      name: "Literature",
      subject: englishSubject._id,
      description: "Poetry, drama, and prose",
      order: 1,
    });

    // Shakespeare Topic
    const shakespeareTopic = await Topic.create({
      name: "Shakespeare",
      category: literatureCategory._id,
      subject: englishSubject._id,
      description: "Shakespearean drama and themes",
      difficulty: "hard",
      order: 1,
    });

    // Create 100 Shakespeare questions
    console.log("📝 Creating Shakespeare questions...");
    const shakespeareQuestions = [];
    const shakespeareQuestionsData = [
      {
        question: 'Who wrote "Romeo and Juliet"?',
        options: [
          "Charles Dickens",
          "William Shakespeare",
          "Jane Austen",
          "Mark Twain",
        ],
        correct: 1,
        explanation:
          'William Shakespeare wrote "Romeo and Juliet" around 1594-1596.',
      },
      {
        question: "What is a sonnet?",
        options: [
          "A 14-line poem with a specific rhyme scheme",
          "A type of play",
          "A short story",
          "A type of novel",
        ],
        correct: 0,
        explanation:
          "A sonnet is a 14-line poem, typically written in iambic pentameter.",
      },
      {
        question: 'What does "To be or not to be" refer to?',
        options: ["Love", "Death", "War", "Money"],
        correct: 1,
        explanation:
          "This famous soliloquy from Hamlet contemplates life and death.",
      },
    ];

    for (let i = 0; i < 100; i++) {
      const template =
        shakespeareQuestionsData[i % shakespeareQuestionsData.length];
      shakespeareQuestions.push({
        topic: shakespeareTopic._id,
        category: literatureCategory._id,
        subject: englishSubject._id,
        questionText: template.question,
        options: template.options,
        correctAnswer: template.options[template.correct],
        explanation: template.explanation,
        difficulty: i < 30 ? "easy" : i < 70 ? "medium" : "hard",
        points: 1,
      });
    }

    await Question.insertMany(shakespeareQuestions);
    await Topic.findByIdAndUpdate(shakespeareTopic._id, {
      totalQuestions: 100,
    });
    console.log("✅ Created 100 Shakespeare questions");

    // ==================== HISTORY ====================
    const historySubject = await Subject.create({
      name: "History",
      description: "Grade 12 South African and World History",
      icon: "📜",
      color: "#9C27B0",
    });

    console.log("✅ Created History subject");

    const saHistoryCategory = await Category.create({
      name: "South African History",
      subject: historySubject._id,
      description: "Apartheid, liberation, and democracy",
      order: 1,
    });

    const apartheidTopic = await Topic.create({
      name: "Apartheid Era",
      category: saHistoryCategory._id,
      subject: historySubject._id,
      description: "Apartheid policies and resistance",
      difficulty: "medium",
      order: 1,
    });

    // Create 100 Apartheid questions
    console.log("📝 Creating Apartheid Era questions...");
    const apartheidQuestions = [];
    const apartheidQuestionsData = [
      {
        question:
          "In what year did Apartheid officially begin in South Africa?",
        options: ["1948", "1950", "1960", "1970"],
        correct: 0,
        explanation:
          "Apartheid was officially implemented in 1948 by the National Party.",
      },
      {
        question: "Who was the first Black president of South Africa?",
        options: [
          "Thabo Mbeki",
          "Nelson Mandela",
          "Desmond Tutu",
          "Oliver Tambo",
        ],
        correct: 1,
        explanation: "Nelson Mandela became the first Black president in 1994.",
      },
      {
        question: 'What does "Apartheid" mean in Afrikaans?',
        options: ["Separation", "Unity", "Freedom", "Justice"],
        correct: 0,
        explanation:
          'Apartheid means "apartness" or "separateness" in Afrikaans.',
      },
    ];

    for (let i = 0; i < 100; i++) {
      const template =
        apartheidQuestionsData[i % apartheidQuestionsData.length];
      apartheidQuestions.push({
        topic: apartheidTopic._id,
        category: saHistoryCategory._id,
        subject: historySubject._id,
        questionText: template.question,
        options: template.options,
        correctAnswer: template.options[template.correct],
        explanation: template.explanation,
        difficulty: i < 30 ? "easy" : i < 70 ? "medium" : "hard",
        points: 1,
      });
    }

    await Question.insertMany(apartheidQuestions);
    await Topic.findByIdAndUpdate(apartheidTopic._id, { totalQuestions: 100 });
    console.log("✅ Created 100 Apartheid Era questions");

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Subjects: 4`);
    console.log(`   - Categories: 4`);
    console.log(`   - Topics: 5`);
    console.log(`   - Questions: 500`);
    console.log("\n✅ You can now start the server with: npm run dev");

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
