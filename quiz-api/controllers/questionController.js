const Question = require("../models/Question");
const Topic = require("../models/Topic");

exports.getTestQuestions = async (req, res) => {
  try {
    const { topicId } = req.params;
    const limit = parseInt(req.query.limit) || 20;

    const questions = await Question.find({
      topic: topicId,
      isActive: true,
    })
      .sort(() => 0.5 - Math.random())
      .limit(limit);

    await Question.updateMany(
      { _id: { $in: questions.map((q) => q._id) } },
      { $inc: { timesUsed: 1 } }
    );

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

exports.submitTestAnswers = async (req, res) => {
  try {
    const { answers } = req.body;
    let score = 0;
    const results = [];

    for (const answer of answers) {
      const question = await Question.findById(answer.questionId);

      if (!question) continue;

      const isCorrect = question.correctAnswer === answer.selectedAnswer;

      if (isCorrect) {
        score += question.points;
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

exports.createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
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

exports.bulkCreateQuestions = async (req, res) => {
  try {
    const { questions } = req.body;
    const createdQuestions = await Question.insertMany(questions);

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
