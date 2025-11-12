import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import questionBank from "../data/sampleQuestions";

export default function TakeTestScreen({ route, navigation }) {
  const { subject, topic, grade } = route.params;
  const { user } = useContext(AuthContext);
  const themeContext = useTheme();
  const theme = themeContext?.theme || {
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#6200EE",
    border: "#e0e0e0",
    success: "#4CAF50",
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Get questions based on subject and topic
  const getQuestions = () => {
    let questions = [];

    if (subject?.name === "Mathematics") {
      questions = questionBank.Mathematics?.Algebra || [];
    } else if (subject?.name === "Science") {
      questions = questionBank.Science?.Physics || [];
    } else if (subject?.name === "English") {
      questions = questionBank.English?.Grammar || [];
    } else if (subject?.name === "History") {
      questions = questionBank.History || [];
    } else if (subject?.name === "Geography") {
      questions = questionBank.Geography || [];
    } else if (subject?.name === "Programming") {
      questions = questionBank.Programming?.Python || [];
    }

    // Filter by grade
    return questions
      .filter((q) => q.grade && q.grade.includes(grade || "12"))
      .slice(0, 20); // Limit to 20 questions
  };

  const questions = getQuestions();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const handleSubmit = () => {
    const calculatedScore = answers.filter(
      (answer, index) => answer === questions[index]?.correctAnswer
    ).length;

    setScore(calculatedScore);
    setShowResults(true);
    setCurrentQuestion(0);
    setSelectedAnswer(answers[0]);

    Alert.alert(
      "Test Complete!",
      `You scored ${calculatedScore} out of ${questions.length} (${Math.round(
        (calculatedScore / questions.length) * 100
      )}%)`,
      [
        {
          text: "Review Answers",
          onPress: () => {
            // Already in review mode
          },
        },
        {
          text: "Go Home",
          onPress: () => navigation.navigate("MainApp"),
        },
      ]
    );
  };

  const handleReviewNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(answers[currentQuestion + 1]);
    }
  };

  const handleReviewPrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1]);
    }
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No questions available for this subject and grade level.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isCorrect = answers[currentQuestion] === question?.correctAnswer;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        {showResults ? (
          <TouchableOpacity onPress={() => navigation.navigate("MainApp")}>
            <Text style={[styles.backText, { color: theme.primary }]}>
              ← Home
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[styles.backText, { color: theme.primary }]}>
              ← Back
            </Text>
          </TouchableOpacity>
        )}

        {showResults ? (
          <View style={styles.scoreContainer}>
            <Text style={[styles.scoreText, { color: theme.text }]}>
              Score: {score}/{questions.length}
            </Text>
            <Text style={[styles.percentText, { color: theme.primary }]}>
              {Math.round((score / questions.length) * 100)}%
            </Text>
          </View>
        ) : (
          <Text style={[styles.timer, { color: theme.text }]}>
            {formatTime(timeLeft)}
          </Text>
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${progress}%`, backgroundColor: theme.primary },
          ]}
        />
      </View>

      {/* Review Mode Banner */}
      {showResults && (
        <View
          style={[
            styles.reviewBanner,
            { backgroundColor: isCorrect ? "#d4edda" : "#f8d7da" },
          ]}
        >
          <Text
            style={[
              styles.reviewBannerText,
              { color: isCorrect ? "#155724" : "#721c24" },
            ]}
          >
            {isCorrect ? "✓ Correct Answer" : "✗ Incorrect Answer"}
          </Text>
        </View>
      )}

      <ScrollView style={styles.content}>
        {/* Question */}
        <View style={[styles.questionCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.questionNumber, { color: theme.primary }]}>
            Question {currentQuestion + 1} of {questions.length}
          </Text>
          <Text style={[styles.questionText, { color: theme.text }]}>
            {question.question}
          </Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => {
            const isSelected = answers[currentQuestion] === index;
            const isCorrectOption = index === question.correctAnswer;
            const showCorrect = showResults && isCorrectOption;
            const showIncorrect = showResults && isSelected && !isCorrectOption;

            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  { backgroundColor: theme.surface },
                  isSelected && !showResults && styles.optionSelected,
                  showCorrect && styles.optionCorrect,
                  showIncorrect && styles.optionIncorrect,
                ]}
                onPress={() => !showResults && handleAnswer(index)}
                disabled={showResults}
              >
                <Text
                  style={[
                    styles.optionLetter,
                    { color: theme.text },
                    isSelected && !showResults && styles.optionLetterSelected,
                    showCorrect && styles.optionLetterSelected,
                    showIncorrect && styles.optionLetterIncorrect,
                  ]}
                >
                  {String.fromCharCode(65 + index)}
                </Text>
                <Text
                  style={[
                    styles.optionText,
                    { color: theme.text },
                    isSelected && !showResults && styles.optionTextSelected,
                    (showCorrect || showIncorrect) && styles.optionTextSelected,
                  ]}
                >
                  {option}
                </Text>
                {showCorrect && <Text style={styles.checkMark}>✓</Text>}
                {showIncorrect && <Text style={styles.crossMark}>✗</Text>}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Explanation in Review Mode */}
        {showResults && question.explanation && (
          <View
            style={[styles.explanationCard, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.explanationTitle, { color: theme.primary }]}>
              💡 Explanation
            </Text>
            <Text style={[styles.explanationText, { color: theme.text }]}>
              {question.explanation}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.previousButton,
            currentQuestion === 0 && styles.navButtonDisabled,
          ]}
          onPress={showResults ? handleReviewPrevious : handlePrevious}
          disabled={currentQuestion === 0}
        >
          <Text style={styles.navButtonText}>← Previous</Text>
        </TouchableOpacity>

        {showResults ? (
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.nextButton,
              currentQuestion === questions.length - 1 &&
                styles.navButtonDisabled,
            ]}
            onPress={handleReviewNext}
            disabled={currentQuestion === questions.length - 1}
          >
            <Text style={[styles.navButtonText, { color: "#fff" }]}>
              {currentQuestion === questions.length - 1
                ? "Finish Review"
                : "Next →"}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[
              styles.navButton,
              styles.nextButton,
              selectedAnswer === null && styles.navButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={selectedAnswer === null}
          >
            <Text style={[styles.navButtonText, { color: "#fff" }]}>
              {currentQuestion === questions.length - 1 ? "Finish" : "Next →"}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  backText: {
    fontSize: 16,
    fontWeight: "600",
  },
  timer: {
    fontSize: 18,
    fontWeight: "bold",
  },
  scoreContainer: {
    alignItems: "flex-end",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "600",
  },
  percentText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  reviewBanner: {
    padding: 12,
    alignItems: "center",
  },
  reviewBannerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#e0e0e0",
  },
  progressBar: {
    height: "100%",
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
  questionNumber: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  optionSelected: {
    borderColor: "#6200EE",
    backgroundColor: "#f0e6ff",
  },
  optionCorrect: {
    borderColor: "#28a745",
    backgroundColor: "#d4edda",
  },
  optionIncorrect: {
    borderColor: "#dc3545",
    backgroundColor: "#f8d7da",
  },
  optionLetter: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    lineHeight: 35,
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 15,
  },
  optionLetterSelected: {
    backgroundColor: "#6200EE",
    color: "#fff",
  },
  optionLetterIncorrect: {
    backgroundColor: "#dc3545",
    color: "#fff",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  optionTextSelected: {
    fontWeight: "600",
  },
  checkMark: {
    fontSize: 24,
    color: "#28a745",
    fontWeight: "bold",
  },
  crossMark: {
    fontSize: 24,
    color: "#dc3545",
    fontWeight: "bold",
  },
  explanationCard: {
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  explanationText: {
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  previousButton: {
    backgroundColor: "#e0e0e0",
  },
  nextButton: {
    backgroundColor: "#6200EE",
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#6200EE",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
