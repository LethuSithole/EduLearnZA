const Question = require("../models/Question");
const Topic = require("../models/Topic");
const TestSession = require("../models/TestSession");
const User = require("../models/User");

// Get random questions for a test (20 questions, non-repeating)
exports.getTestQuestions = async (req, res) => {
  try {
    const { topicId } = req.params;
    const userId = req.user?.id; // From auth middleware
    const limit = parseInt(req.query.limit) || 20;

    // Get user's previously used questions for this topic
    let usedQuestionIds = [];
    if (userId) {
      const user = await User.findById(userId);
      const topicHistory = user.testHistory.filter(
        (test) => test.topic.toString() === topicId
      );

      topicHistory.forEach((test) => {
        usedQuestionIds.push(...test.questionsUsed);
      });
    }

    // Get available questions (excluding used ones)
    const availableQuestions = await Question.find({
      topic: topicId,
      isActive: true,
      _id: { $nin: usedQuestionIds },
    });

    // If not enough unused questions, include some used ones
    let questions = [];
    if (availableQuestions.length >= limit) {
      // Randomly select from unused questions
      questions = availableQuestions
        .sort(() => 0.5 - Math.random())
        .slice(0, limit);
    } else {
      // Use all available unused questions
      questions = [...availableQuestions];

      // Fill remaining with used questions (least recently used)
      const needed = limit - questions.length;
      const usedQuestions = await Question.find({
        topic: topicId,
        isActive: true,
        _id: { $in: usedQuestionIds },
      })
        .sort("timesUsed")
        .limit(needed);

      questions.push(...usedQuestions);
    }

    // Update timesUsed counter
    const questionIds = questions.map((q) => q._id);
    await Question.updateMany(
      { _id: { $in: questionIds } },
      { $inc: { timesUsed: 1 } }
    );

    // Create test session
    if (userId) {
      await TestSession.create({
        user: userId,
        topic: topicId,
        questions: questionIds,
        totalQuestions: questions.length,
      });
    }

    // Remove correct answer from response
    const questionsForClient = questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      options: q.options,
      difficulty: q.difficulty,
      points: q.points,
    }));

    res.json({
      success: true,
      count: questionsForClient.length,
      data: questionsForClient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Submit test answers
exports.submitTestAnswers = async (req, res) => {
  try {
    const { answers } = req.body; // Array of { questionId, selectedAnswer }
    const userId = req.user?.id;

    let score = 0;
    const results = [];

    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);

      if (!question) continue;

      const isCorrect = question.correctAnswer === answer.selectedAnswer;

      if (isCorrect) {
        score += question.points;
        await Question.findByIdAndUpdate(answer.questionId, {
          $inc: { correctAttempts: 1, totalAttempts: 1 },
        });
      } else {
        await Question.findByIdAndUpdate(answer.questionId, {
          $inc: { totalAttempts: 1 },
        });
      }

      results.push({
        questionId: question._id,
        questionText: question.questionText,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation,
      });
    }

    const totalQuestions = answers.length;
    const percentage = Math.round((score / totalQuestions) * 100);

    // Update user test history
    if (userId) {
      const user = await User.findById(userId);
      const topic = await Question.findById(answers[0].questionId).select(
        "topic"
      );

      user.testHistory.push({
        topic: topic.topic,
        score,
        totalQuestions,
        percentage,
        questionsUsed: answers.map((a) => a.questionId),
      });

      await user.save();
    }

    res.json({
      success: true,
      data: {
        score,
        totalQuestions,
        percentage,
        results,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// Create question (Admin)
exports.createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);

    // Update topic's totalQuestions count
    await Topic.findByIdAndUpdate(question.topic, {
      $inc: { totalQuestions: 1 },
    });

    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Bulk create questions (Admin)
exports.bulkCreateQuestions = async (req, res) => {
  try {
    const { questions } = req.body; // Array of question objects

    const createdQuestions = await Question.insertMany(questions);

    // Update topic counts
    const topicCounts = {};
    questions.forEach((q) => {
      topicCounts[q.topic] = (topicCounts[q.topic] || 0) + 1;
    });

    for (const [topicId, count] of Object.entries(topicCounts)) {
      await Topic.findByIdAndUpdate(topicId, {
        $inc: { totalQuestions: count },
      });
    }

    res.status(201).json({
      success: true,
      count: createdQuestions.length,
      data: createdQuestions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Update question (Admin)
exports.updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    res.json({
      success: true,
      data: question,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// Delete question (Admin)
exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    // Update topic's totalQuestions count
    await Topic.findByIdAndUpdate(question.topic, {
      $inc: { totalQuestions: -1 },
    });

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

// Get question statistics (Admin)
exports.getQuestionStats = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        error: "Question not found",
      });
    }

    const successRate =
      question.totalAttempts > 0
        ? (question.correctAttempts / question.totalAttempts) * 100
        : 0;

    res.json({
      success: true,
      data: {
        ...question.toObject(),
        successRate: successRate.toFixed(2),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
