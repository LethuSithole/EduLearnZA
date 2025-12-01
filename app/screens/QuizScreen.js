import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const API_URL = "http://192.168.1.100:5000";

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function QuizScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const { subject } = route.params;

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'quiz'

  // Quiz mode states
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [subject]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log(`Fetching questions for subject: ${subject.name}`);

      const response = await api.get("/api/questions", {
        params: {
          subject: subject.name,
          limit: 100,
        },
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      console.log(`Received ${response.data.length} questions`);

      if (response.data && response.data.length > 0) {
        setQuestions(response.data);
      } else {
        setError(`No questions available for ${subject.name} yet.`);
      }
    } catch (err) {
      console.error("Error fetching questions:", err);

      let errorMessage = "Failed to load questions.";

      if (err.response) {
        errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          errorMessage;
      } else if (err.request) {
        errorMessage =
          "Cannot connect to server. Please check your internet connection.";
      } else {
        errorMessage = err.message || errorMessage;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const startQuiz = () => {
    // Shuffle questions for quiz mode
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setQuestions(shuffled);
    setViewMode("quiz");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnswered(false);
    setQuizCompleted(false);
  };

  const handleAnswerPress = (answer) => {
    if (answered) return;

    setSelectedAnswer(answer);
    setAnswered(true);

    const isCorrect = answer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }

    setShowResult(true);

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
    } else {
      setQuizCompleted(true);
      saveProgress();
    }
  };

  const saveProgress = async () => {
    try {
      const percentage = Math.round((score / questions.length) * 100);

      await api.post(
        "/api/progress",
        {
          userId: user?.id,
          subject: subject.name,
          score: score,
          totalQuestions: questions.length,
          percentage: percentage,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      console.log("Progress saved successfully");
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  const backToList = () => {
    setViewMode("list");
    setQuizCompleted(false);
    fetchQuestions();
  };

  // Loading State
  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: subject.color || theme.primary },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{subject.name}</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Loading questions from database...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error State
  if (error) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: subject.color || theme.primary },
          ]}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{subject.name}</Text>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={[styles.errorText, { color: theme.text }]}>{error}</Text>
          <TouchableOpacity
            style={[
              styles.retryButton,
              { backgroundColor: subject.color || theme.primary },
            ]}
            onPress={fetchQuestions}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.backHomeButton, { borderColor: theme.border }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backHomeButtonText, { color: theme.text }]}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Quiz Completed
  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const passed = percentage >= 60;

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: subject.color || theme.primary },
          ]}
        >
          <Text style={styles.headerTitle}>Quiz Complete!</Text>
        </View>

        <ScrollView contentContainerStyle={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.resultEmoji}>{passed ? "🎉" : "💪"}</Text>
            <Text style={[styles.resultTitle, { color: theme.text }]}>
              {passed ? "Excellent Work!" : "Keep Practicing!"}
            </Text>
            <View style={styles.scoreContainer}>
              <Text
                style={[
                  styles.scoreValue,
                  { color: passed ? "#4CAF50" : "#FF9800" },
                ]}
              >
                {score}/{questions.length}
              </Text>
              <Text
                style={[
                  styles.percentageValue,
                  { color: passed ? "#4CAF50" : "#FF9800" },
                ]}
              >
                {percentage}%
              </Text>
            </View>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: subject.color || theme.primary },
                ]}
                onPress={startQuiz}
              >
                <Text style={styles.actionButtonText}>🔄 Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButtonSecondary,
                  { borderColor: theme.border },
                ]}
                onPress={backToList}
              >
                <Text
                  style={[
                    styles.actionButtonSecondaryText,
                    { color: theme.text },
                  ]}
                >
                  📋 View All Questions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.actionButtonSecondary,
                  { borderColor: theme.border },
                ]}
                onPress={() => navigation.goBack()}
              >
                <Text
                  style={[
                    styles.actionButtonSecondaryText,
                    { color: theme.text },
                  ]}
                >
                  🏠 Back to Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Quiz Mode
  if (viewMode === "quiz") {
    const question = questions[currentQuestion];

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: subject.color || theme.primary },
          ]}
        >
          <TouchableOpacity onPress={backToList}>
            <Text style={styles.backButton}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{subject.name} Quiz</Text>
          <View style={styles.headerProgress}>
            <Text style={styles.headerProgressText}>
              {currentQuestion + 1}/{questions.length}
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.progressBarContainer,
            { backgroundColor: theme.border },
          ]}
        >
          <View
            style={[
              styles.progressBar,
              {
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                backgroundColor: subject.color || theme.primary,
              },
            ]}
          />
        </View>

        <ScrollView style={styles.content}>
          <View
            style={[
              styles.questionCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <View style={styles.questionHeader}>
              <Text
                style={[
                  styles.topicBadge,
                  {
                    color: subject.color || theme.primary,
                    backgroundColor: (subject.color || theme.primary) + "20",
                  },
                ]}
              >
                {question.topic || "General"}
              </Text>
              <Text
                style={[
                  styles.difficultyBadge,
                  {
                    backgroundColor:
                      question.difficulty === "Easy"
                        ? "#4CAF50"
                        : question.difficulty === "Medium"
                        ? "#FF9800"
                        : "#F44336",
                  },
                ]}
              >
                {question.difficulty || "Medium"}
              </Text>
            </View>
            <Text style={[styles.questionText, { color: theme.text }]}>
              {question.question}
            </Text>
          </View>

          <View style={styles.optionsContainer}>
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showIncorrect = showResult && isSelected && !isCorrect;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    {
                      backgroundColor: theme.surface,
                      borderColor: showCorrect
                        ? "#4CAF50"
                        : showIncorrect
                        ? "#F44336"
                        : isSelected
                        ? subject.color
                        : theme.border,
                      borderWidth: 2,
                    },
                  ]}
                  onPress={() => handleAnswerPress(option)}
                  disabled={answered}
                >
                  <View style={styles.optionContent}>
                    <Text
                      style={[
                        styles.optionLetter,
                        {
                          color: showCorrect
                            ? "#4CAF50"
                            : showIncorrect
                            ? "#F44336"
                            : isSelected
                            ? subject.color
                            : theme.textSecondary,
                        },
                      ]}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                    <Text style={[styles.optionText, { color: theme.text }]}>
                      {option}
                    </Text>
                    {showCorrect && <Text style={styles.checkmark}>✓</Text>}
                    {showIncorrect && <Text style={styles.crossmark}>✗</Text>}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {showResult && question.explanation && (
            <View
              style={[
                styles.explanationCard,
                {
                  backgroundColor:
                    selectedAnswer === question.correctAnswer
                      ? "#E8F5E9"
                      : "#FFEBEE",
                  borderColor:
                    selectedAnswer === question.correctAnswer
                      ? "#4CAF50"
                      : "#F44336",
                },
              ]}
            >
              <Text style={styles.explanationTitle}>
                {selectedAnswer === question.correctAnswer
                  ? "✓ Correct!"
                  : "✗ Incorrect"}
              </Text>
              <Text style={styles.explanationText}>{question.explanation}</Text>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  // List Mode - Show All Questions
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: subject.color || theme.primary },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={styles.headerTitle}>{subject.name}</Text>
          <Text style={styles.headerSubtitle}>
            {questions.length} Questions Available
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.modeToggle,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.quizButton,
            { backgroundColor: subject.color || theme.primary },
          ]}
          onPress={startQuiz}
        >
          <Text style={styles.quizButtonText}>🎯 Start Quiz Mode</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {questions.map((q, index) => (
          <View
            key={index}
            style={[
              styles.listQuestionCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <TouchableOpacity
              style={styles.questionHeaderRow}
              onPress={() => toggleQuestion(index)}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.questionMeta}>
                  <Text style={styles.questionNumber}>Q{index + 1}</Text>
                  <Text
                    style={[
                      styles.listTopicBadge,
                      {
                        color: subject.color || theme.primary,
                        backgroundColor:
                          (subject.color || theme.primary) + "20",
                      },
                    ]}
                  >
                    {q.topic || "General"}
                  </Text>
                  <Text
                    style={[
                      styles.listDifficultyBadge,
                      {
                        backgroundColor:
                          q.difficulty === "Easy"
                            ? "#4CAF50"
                            : q.difficulty === "Medium"
                            ? "#FF9800"
                            : "#F44336",
                      },
                    ]}
                  >
                    {q.difficulty}
                  </Text>
                </View>
                <Text
                  style={[styles.listQuestionText, { color: theme.text }]}
                  numberOfLines={expandedQuestion === index ? undefined : 2}
                >
                  {q.question}
                </Text>
              </View>
              <Text style={[styles.expandIcon, { color: theme.textSecondary }]}>
                {expandedQuestion === index ? "▼" : "▶"}
              </Text>
            </TouchableOpacity>

            {expandedQuestion === index && (
              <View style={styles.expandedContent}>
                <View style={styles.divider} />
                <Text
                  style={[styles.optionsTitle, { color: theme.textSecondary }]}
                >
                  Options:
                </Text>
                {q.options.map((option, optIndex) => {
                  const isCorrect = option === q.correctAnswer;
                  return (
                    <View
                      key={optIndex}
                      style={[
                        styles.listOption,
                        isCorrect && {
                          backgroundColor: "#E8F5E9",
                          borderColor: "#4CAF50",
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.listOptionLetter,
                          {
                            color: isCorrect ? "#4CAF50" : theme.textSecondary,
                          },
                        ]}
                      >
                        {String.fromCharCode(65 + optIndex)}
                      </Text>
                      <Text
                        style={[styles.listOptionText, { color: theme.text }]}
                      >
                        {option}
                      </Text>
                      {isCorrect && (
                        <Text style={styles.correctBadge}>✓ Correct</Text>
                      )}
                    </View>
                  );
                })}
                {q.explanation && (
                  <>
                    <Text
                      style={[
                        styles.explanationLabel,
                        { color: theme.textSecondary },
                      ]}
                    >
                      Explanation:
                    </Text>
                    <Text
                      style={[styles.listExplanation, { color: theme.text }]}
                    >
                      {q.explanation}
                    </Text>
                  </>
                )}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  backButton: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
    marginTop: 4,
  },
  headerProgress: {
    marginTop: 10,
  },
  headerProgressText: {
    color: "#FFF",
    fontSize: 14,
    opacity: 0.9,
  },
  progressBarContainer: {
    height: 4,
  },
  progressBar: {
    height: "100%",
  },
  modeToggle: {
    padding: 15,
    borderBottomWidth: 1,
  },
  quizButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  quizButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    padding: 15,
  },
  listQuestionCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    elevation: 2,
    overflow: "hidden",
  },
  questionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  questionMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  listTopicBadge: {
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  listDifficultyBadge: {
    fontSize: 10,
    fontWeight: "600",
    color: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  listQuestionText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "500",
  },
  expandIcon: {
    fontSize: 16,
    marginLeft: 10,
  },
  expandedContent: {
    padding: 16,
    paddingTop: 0,
  },
  divider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginBottom: 12,
  },
  optionsTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  listOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    marginBottom: 8,
  },
  listOptionLetter: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    width: 20,
  },
  listOptionText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  correctBadge: {
    fontSize: 12,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  explanationLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
  },
  listExplanation: {
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  questionCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 2,
  },
  questionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  topicBadge: {
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 11,
    fontWeight: "600",
    color: "#FFF",
  },
  questionText: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: "500",
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderRadius: 12,
    padding: 16,
    elevation: 1,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionLetter: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 12,
    width: 24,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
    lineHeight: 22,
  },
  checkmark: {
    fontSize: 20,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  crossmark: {
    fontSize: 20,
    color: "#F44336",
    fontWeight: "bold",
  },
  explanationCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 20,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 24,
    fontWeight: "600",
  },
  retryButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginBottom: 12,
  },
  retryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backHomeButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    borderWidth: 2,
  },
  backHomeButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  resultContainer: {
    padding: 20,
    alignItems: "center",
  },
  resultCard: {
    width: "100%",
    alignItems: "center",
  },
  resultEmoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
  },
  scoreContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 5,
  },
  percentageValue: {
    fontSize: 32,
    fontWeight: "600",
  },
  buttonGroup: {
    width: "100%",
    gap: 12,
  },
  actionButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  actionButtonSecondary: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  actionButtonSecondaryText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
