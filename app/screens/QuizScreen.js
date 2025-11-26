import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function QuizScreen({ navigation, route }) {
  const { subject, topic, questions } = route.params || {};
  const { theme } = useTheme();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  // Timer
  useEffect(() => {
    if (!quizStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      Alert.alert(
        "No Answer Selected",
        "Please select an answer before continuing."
      );
      return;
    }

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer;
    setUserAnswers(newAnswers);

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1] || null);
    }
  };

  const handleFinishQuiz = () => {
    setShowResult(true);
  };

  const getScorePercentage = () => {
    return Math.round((score / totalQuestions) * 100);
  };

  const getScoreMessage = () => {
    const percentage = getScorePercentage();
    if (percentage >= 80) return "Excellent! 🌟";
    if (percentage >= 60) return "Good Job! 👍";
    if (percentage >= 40) return "Keep Practicing! 📚";
    return "Need More Study 💪";
  };

  if (!quizStarted) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.startContainer}>
          <Text style={styles.startIcon}>📝</Text>
          <Text style={[styles.startTitle, { color: theme.text }]}>
            Ready to Start Quiz?
          </Text>
          <Text style={[styles.startSubtitle, { color: theme.textSecondary }]}>
            {subject?.name} • {topic?.name}
          </Text>

          <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Questions:
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {totalQuestions}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Time Limit:
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                60 minutes
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Passing Score:
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>40%</Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.startButton, { backgroundColor: theme.primary }]}
            onPress={handleStartQuiz}
          >
            <Text style={styles.startButtonText}>Start Quiz 🚀</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.cancelButton, { borderColor: theme.border }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.cancelButtonText, { color: theme.text }]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (showResult) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.resultContainer}>
          <Text style={styles.resultIcon}>
            {getScorePercentage() >= 40 ? "🎉" : "📖"}
          </Text>
          <Text style={[styles.resultTitle, { color: theme.text }]}>
            {getScoreMessage()}
          </Text>

          <View style={[styles.scoreCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.scoreText, { color: theme.primary }]}>
              {score} / {totalQuestions}
            </Text>
            <Text style={[styles.percentageText, { color: theme.text }]}>
              {getScorePercentage()}%
            </Text>
          </View>

          <View style={[styles.statsCard, { backgroundColor: theme.surface }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "#4CAF50" }]}>
                {score}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Correct
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: "#F44336" }]}>
                {totalQuestions - score}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Wrong
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                {totalQuestions}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Total
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.finishButton, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.finishButtonText}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.reviewButton, { borderColor: theme.border }]}
            onPress={() => {
              setShowResult(false);
              setCurrentQuestionIndex(0);
              setSelectedAnswer(userAnswers[0] || null);
            }}
          >
            <Text style={[styles.reviewButtonText, { color: theme.text }]}>
              Review Answers
            </Text>
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
        <View style={styles.headerTop}>
          <Text style={[styles.questionCounter, { color: theme.text }]}>
            Question {currentQuestionIndex + 1}/{totalQuestions}
          </Text>
          <Text style={[styles.timer, { color: theme.primary }]}>
            ⏱️ {formatTime(timeLeft)}
          </Text>
        </View>
        <View
          style={[styles.progressBar, { backgroundColor: theme.background }]}
        >
          <View
            style={[
              styles.progressFill,
              { backgroundColor: theme.primary, width: `${progress}%` },
            ]}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Question */}
        <View style={[styles.questionCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.questionText, { color: theme.text }]}>
            {currentQuestion.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options?.map((option, index) => {
            const optionLetter = String.fromCharCode(65 + index);
            const isSelected = selectedAnswer === optionLetter;
            const isCorrect = currentQuestion.correctAnswer === optionLetter;
            const showCorrect = userAnswers[currentQuestionIndex] !== undefined;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  {
                    backgroundColor: isSelected
                      ? theme.primary + "20"
                      : theme.surface,
                    borderColor: isSelected ? theme.primary : theme.border,
                    borderWidth: 2,
                  },
                  showCorrect && isCorrect && styles.correctOption,
                  showCorrect && isSelected && !isCorrect && styles.wrongOption,
                ]}
                onPress={() => handleAnswerSelect(optionLetter)}
                disabled={userAnswers[currentQuestionIndex] !== undefined}
              >
                <View style={styles.optionContent}>
                  <View
                    style={[
                      styles.optionCircle,
                      {
                        borderColor: isSelected ? theme.primary : theme.border,
                        backgroundColor: isSelected
                          ? theme.primary
                          : "transparent",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionLetter,
                        { color: isSelected ? "#fff" : theme.text },
                      ]}
                    >
                      {optionLetter}
                    </Text>
                  </View>
                  <Text style={[styles.optionText, { color: theme.text }]}>
                    {option}
                  </Text>
                  {showCorrect && isCorrect && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                  {showCorrect && isSelected && !isCorrect && (
                    <Text style={styles.crossmark}>✗</Text>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[
            styles.navButton,
            {
              backgroundColor: theme.background,
              borderColor: theme.border,
              opacity: currentQuestionIndex === 0 ? 0.5 : 1,
            },
          ]}
          onPress={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
        >
          <Text style={[styles.navButtonText, { color: theme.text }]}>
            ← Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.navButton,
            styles.nextButton,
            { backgroundColor: theme.primary },
          ]}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex === totalQuestions - 1 ? "Finish" : "Next →"}
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
  startIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  startTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  startSubtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  infoCard: {
    width: "100%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
  },
  startButton: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  cancelButton: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  header: {
    padding: 20,
    elevation: 4,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  questionCounter: {
    fontSize: 16,
    fontWeight: "bold",
  },
  timer: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
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
  },
  questionText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  optionLetter: {
    fontSize: 16,
    fontWeight: "bold",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  checkmark: {
    fontSize: 24,
    color: "#4CAF50",
  },
  crossmark: {
    fontSize: 24,
    color: "#F44336",
  },
  correctOption: {
    borderColor: "#4CAF50",
    backgroundColor: "#4CAF5020",
  },
  wrongOption: {
    borderColor: "#F44336",
    backgroundColor: "#F4433620",
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    gap: 15,
    elevation: 4,
  },
  navButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  nextButton: {
    borderWidth: 0,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  resultIcon: {
    fontSize: 100,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  scoreCard: {
    width: "100%",
    padding: 30,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
    elevation: 2,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  percentageText: {
    fontSize: 24,
    fontWeight: "600",
    marginTop: 10,
  },
  statsCard: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    borderRadius: 12,
    marginBottom: 30,
    elevation: 2,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  finishButton: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  finishButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  reviewButton: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
