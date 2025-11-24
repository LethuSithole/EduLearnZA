import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

const { width } = Dimensions.get("window");

export default function QuizScreen({ navigation, route }) {
  const { subject, topic, questions } = route.params || {};
  const { theme } = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds per question
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = questions?.[currentQuestionIndex];
  const totalQuestions = questions?.length || 0;

  // Timer
  useEffect(() => {
    if (quizStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && quizStarted) {
      handleNext(true); // Auto-submit when time runs out
    }
  }, [timeLeft, quizStarted]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = (timeOut = false) => {
    const correctAnswerIndex = ["A", "B", "C", "D"].indexOf(
      currentQuestion.correctAnswer
    );
    const isCorrect = !timeOut && selectedAnswer === correctAnswerIndex;

    // Record answer
    setAnswers([
      ...answers,
      {
        questionId: currentQuestion._id,
        question: currentQuestion.question,
        userAnswer: timeOut
          ? "No answer"
          : currentQuestion.options[selectedAnswer],
        correctAnswer: currentQuestion.options[correctAnswerIndex],
        correct: isCorrect,
      },
    ]);

    // Update score
    if (isCorrect) {
      setScore(score + 1);
    }

    // Move to next question or finish quiz
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setTimeLeft(30);
    } else {
      finishQuiz(isCorrect);
    }
  };

  const finishQuiz = (lastAnswerCorrect) => {
    const finalScore = lastAnswerCorrect ? score + 1 : score;
    const percentage = ((finalScore / totalQuestions) * 100).toFixed(1);

    navigation.replace("Result", {
      subject,
      topic,
      score: finalScore,
      totalQuestions,
      percentage,
      answers: [
        ...answers,
        {
          questionId: currentQuestion._id,
          question: currentQuestion.question,
          userAnswer:
            selectedAnswer !== null
              ? currentQuestion.options[selectedAnswer]
              : "No answer",
          correctAnswer:
            currentQuestion.options[
              ["A", "B", "C", "D"].indexOf(currentQuestion.correctAnswer)
            ],
          correct: lastAnswerCorrect,
        },
      ],
    });
  };

  const handleQuit = () => {
    Alert.alert(
      "Quit Quiz",
      "Are you sure you want to quit? Your progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Quit",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  if (!quizStarted) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.startContainer}>
          <Text style={[styles.startTitle, { color: theme.text }]}>
            Ready to Start?
          </Text>
          <Text style={[styles.startSubtitle, { color: theme.textSecondary }]}>
            {subject?.name} - {topic?.name}
          </Text>
          <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.infoText, { color: theme.text }]}>
              📝 {totalQuestions} Questions
            </Text>
            <Text style={[styles.infoText, { color: theme.text }]}>
              ⏱️ 30 seconds per question
            </Text>
            <Text style={[styles.infoText, { color: theme.text }]}>
              🎯 Pass mark: 50%
            </Text>
          </View>
          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: theme.primary }]}
            onPress={startQuiz}
          >
            <Text style={styles.startButtonText}>Start Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.backButton} onPress={handleQuit}>
            <Text style={[styles.backButtonText, { color: theme.primary }]}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentQuestion) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: theme.text }]}>
            No questions available
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: theme.primary,
                width: `${
                  ((currentQuestionIndex + 1) / totalQuestions) * 100
                }%`,
              },
            ]}
          />
        </View>
        <View style={styles.headerInfo}>
          <Text style={[styles.questionCounter, { color: theme.text }]}>
            Question {currentQuestionIndex + 1}/{totalQuestions}
          </Text>
          <View
            style={[
              styles.timerContainer,
              { backgroundColor: timeLeft < 10 ? "#FF6B6B" : theme.primary },
            ]}
          >
            <Text style={styles.timerText}>⏱️ {timeLeft}s</Text>
          </View>
        </View>
      </View>

      {/* Question */}
      <View style={styles.content}>
        <View style={[styles.questionCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.difficultyBadge, { color: theme.primary }]}>
            {currentQuestion.difficulty}
          </Text>
          <Text style={[styles.questionText, { color: theme.text }]}>
            {currentQuestion.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options?.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                {
                  backgroundColor: theme.surface,
                  borderColor:
                    selectedAnswer === index ? theme.primary : theme.border,
                  borderWidth: selectedAnswer === index ? 2 : 1,
                },
              ]}
              onPress={() => handleAnswerSelect(index)}
            >
              <View style={styles.optionContent}>
                <View
                  style={[
                    styles.optionCircle,
                    {
                      backgroundColor:
                        selectedAnswer === index
                          ? theme.primary
                          : theme.background,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  {selectedAnswer === index && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </View>
                <Text
                  style={[styles.optionLabel, { color: theme.textSecondary }]}
                >
                  {String.fromCharCode(65 + index)}.
                </Text>
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {option}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.quitButton, { borderColor: theme.border }]}
          onPress={handleQuit}
        >
          <Text style={[styles.quitButtonText, { color: theme.text }]}>
            Quit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor:
                selectedAnswer !== null ? theme.primary : theme.border,
            },
          ]}
          onPress={() => handleNext(false)}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  startContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  startTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  startSubtitle: {
    fontSize: 18,
    marginBottom: 30,
  },
  infoCard: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
  },
  startButton: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    padding: 20,
    paddingBottom: 15,
  },
  progressBar: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    marginBottom: 15,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  headerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: "600",
  },
  timerContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  timerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  difficultyBadge: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 28,
  },
  optionsContainer: {
    flex: 1,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
  },
  quitButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
  quitButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    flex: 2,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    padding: 16,
    borderRadius: 12,
    minWidth: 150,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
