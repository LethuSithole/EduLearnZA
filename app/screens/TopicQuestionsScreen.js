import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const API_URL = "http://192.168.1.100:5000/api";

// Create axios instance with custom config
const api = axios.create({
  baseURL: API_URL,
  timeout: 120000, // 2 minutes
  headers: {
    "Content-Type": "application/json",
  },
});

export default function TopicQuestionsScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { topic, subject, grade } = route.params;
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await api.get(`/questions`, {
        params: {
          subject: subject.id,
          topic: topic.id,
          grade,
        },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      Alert.alert("Error", "Failed to load questions. Using sample questions.");
      // Sample questions as fallback
      setQuestions([
        {
          id: 1,
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correctAnswer: 1,
          explanation: "2 + 2 equals 4",
        },
        {
          id: 2,
          question: "What is 5 × 3?",
          options: ["10", "12", "15", "18"],
          correctAnswer: 2,
          explanation: "5 multiplied by 3 equals 15",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (index) => {
    if (showResult) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) {
      Alert.alert(
        "Select an Answer",
        "Please select an answer before submitting."
      );
      return;
    }

    const isCorrect =
      selectedAnswer === questions[currentQuestionIndex].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      // Quiz completed
      Alert.alert(
        "Quiz Completed! 🎉",
        `You scored ${
          score +
          (selectedAnswer === questions[currentQuestionIndex].correctAnswer
            ? 1
            : 0)
        } out of ${questions.length}`,
        [
          {
            text: "Back to Topics",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Loading questions...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (questions.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📝</Text>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No questions available
          </Text>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: theme.primary }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.exitButton, { color: theme.primary }]}>
            ← Exit
          </Text>
        </TouchableOpacity>
        <Text style={[styles.topicTitle, { color: theme.text }]}>
          {topic.name}
        </Text>
        <View style={styles.progressContainer}>
          <Text style={[styles.progressText, { color: theme.textSecondary }]}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <Text style={[styles.scoreText, { color: theme.primary }]}>
            Score: {score}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View
          style={[
            styles.questionCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.questionText, { color: theme.text }]}>
            {currentQuestion.question}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option, index) => {
            let optionStyle = [
              styles.optionButton,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ];

            if (showResult) {
              if (index === currentQuestion.correctAnswer) {
                optionStyle.push({
                  backgroundColor: "#4CAF50" + "20",
                  borderColor: "#4CAF50",
                });
              } else if (index === selectedAnswer && !isCorrect) {
                optionStyle.push({
                  backgroundColor: "#F44336" + "20",
                  borderColor: "#F44336",
                });
              }
            } else if (selectedAnswer === index) {
              optionStyle.push({
                backgroundColor: theme.primary + "20",
                borderColor: theme.primary,
              });
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleAnswerSelect(index)}
                disabled={showResult}
              >
                <Text style={[styles.optionLetter, { color: theme.text }]}>
                  {String.fromCharCode(65 + index)}
                </Text>
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {option}
                </Text>
                {showResult && index === currentQuestion.correctAnswer && (
                  <Text style={styles.correctIcon}>✓</Text>
                )}
                {showResult && index === selectedAnswer && !isCorrect && (
                  <Text style={styles.incorrectIcon}>✗</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {showResult && (
          <View
            style={[
              styles.explanationCard,
              {
                backgroundColor: isCorrect
                  ? "#4CAF50" + "15"
                  : "#F44336" + "15",
                borderColor: isCorrect ? "#4CAF50" : "#F44336",
              },
            ]}
          >
            <Text
              style={[
                styles.resultText,
                { color: isCorrect ? "#4CAF50" : "#F44336" },
              ]}
            >
              {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
            </Text>
            {currentQuestion.explanation && (
              <Text style={[styles.explanationText, { color: theme.text }]}>
                {currentQuestion.explanation}
              </Text>
            )}
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        {!showResult ? (
          <TouchableOpacity
            style={[
              styles.submitButton,
              { backgroundColor: theme.primary },
              selectedAnswer === null && styles.submitButtonDisabled,
            ]}
            onPress={handleSubmit}
            disabled={selectedAnswer === null}
          >
            <Text style={styles.submitButtonText}>Submit Answer</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.nextButton, { backgroundColor: theme.primary }]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex < questions.length - 1
                ? "Next Question →"
                : "Finish Quiz"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    elevation: 4,
  },
  exitButton: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  topicTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressText: {
    fontSize: 14,
  },
  scoreText: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  questionCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 20,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  optionLetter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#E0E0E0",
    textAlign: "center",
    lineHeight: 30,
    fontWeight: "bold",
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  correctIcon: {
    fontSize: 20,
    color: "#4CAF50",
  },
  incorrectIcon: {
    fontSize: 20,
    color: "#F44336",
  },
  explanationCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 20,
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: 20,
    elevation: 8,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  nextButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
