import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function TopicQuestionsScreen({ navigation, route }) {
  const { subject, topic, grade } = route.params;
  const { theme } = useTheme();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [testComplete, setTestComplete] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load questions directly (skip API for now)
    setTimeout(() => {
      setQuestions(generateMockQuestions());
      setLoading(false);
    }, 500);
  }, []);

  const generateMockQuestions = () => {
    const subjectName = subject.name.toLowerCase();

    // Mathematics Questions
    const mathQuestions = [
      {
        id: "1",
        question: "Solve for x: 2x + 5 = 15",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 20"],
        correctAnswer: 0,
        topic: "Algebra",
        difficulty: "easy",
        explanation:
          "Subtract 5 from both sides: 2x = 10, then divide by 2: x = 5",
      },
      {
        id: "2",
        question: "What is the value of x² when x = 4?",
        options: ["8", "16", "12", "20"],
        correctAnswer: 1,
        topic: "Algebra",
        difficulty: "easy",
        explanation: "x² = 4² = 4 × 4 = 16",
      },
      {
        id: "3",
        question: "Simplify: 3x + 2x - x",
        options: ["4x", "5x", "6x", "2x"],
        correctAnswer: 0,
        topic: "Algebra",
        difficulty: "medium",
        explanation: "Combine like terms: 3x + 2x - x = (3 + 2 - 1)x = 4x",
      },
      {
        id: "4",
        question:
          "What is the area of a triangle with base 10cm and height 6cm?",
        options: ["30cm²", "60cm²", "16cm²", "40cm²"],
        correctAnswer: 0,
        topic: "Geometry",
        difficulty: "easy",
        explanation: "Area = ½ × base × height = ½ × 10 × 6 = 30cm²",
      },
      {
        id: "5",
        question:
          "Find the circumference of a circle with radius 7cm (π = 22/7)",
        options: ["44cm", "22cm", "154cm", "49cm"],
        correctAnswer: 0,
        topic: "Geometry",
        difficulty: "medium",
        explanation: "Circumference = 2πr = 2 × (22/7) × 7 = 44cm",
      },
      {
        id: "6",
        question: "What is 15% of 200?",
        options: ["30", "25", "35", "20"],
        correctAnswer: 0,
        topic: "Percentages",
        difficulty: "easy",
        explanation: "15% of 200 = (15/100) × 200 = 30",
      },
      {
        id: "7",
        question: "Solve: 3(x - 2) = 12",
        options: ["x = 6", "x = 5", "x = 4", "x = 8"],
        correctAnswer: 0,
        topic: "Algebra",
        difficulty: "medium",
        explanation: "Expand: 3x - 6 = 12, then 3x = 18, so x = 6",
      },
      {
        id: "8",
        question: "What is the value of π (pi) approximately?",
        options: ["3.14", "2.71", "1.41", "4.20"],
        correctAnswer: 0,
        topic: "Constants",
        difficulty: "easy",
        explanation: "π (pi) is approximately 3.14159...",
      },
      {
        id: "9",
        question: "Find the perimeter of a square with side 8cm",
        options: ["32cm", "64cm", "16cm", "24cm"],
        correctAnswer: 0,
        topic: "Geometry",
        difficulty: "easy",
        explanation: "Perimeter = 4 × side = 4 × 8 = 32cm",
      },
      {
        id: "10",
        question: "What is the square root of 144?",
        options: ["12", "14", "10", "16"],
        correctAnswer: 0,
        topic: "Roots",
        difficulty: "easy",
        explanation: "√144 = 12 because 12 × 12 = 144",
      },
    ];

    // English Questions
    const englishQuestions = [
      {
        id: "1",
        question: "What is a noun?",
        options: [
          "A word that describes an action",
          "A word that names a person, place, or thing",
          "A word that describes a noun",
          "A connecting word",
        ],
        correctAnswer: 1,
        topic: "Grammar",
        difficulty: "easy",
        explanation:
          "A noun is a word that names a person, place, thing, or idea.",
      },
      {
        id: "2",
        question: "Identify the verb in: 'The cat sleeps on the mat.'",
        options: ["cat", "sleeps", "mat", "the"],
        correctAnswer: 1,
        topic: "Grammar",
        difficulty: "easy",
        explanation:
          "'Sleeps' is the verb as it shows the action being performed.",
      },
      {
        id: "3",
        question: "What is an adjective?",
        options: [
          "A word that describes a noun",
          "A word that shows action",
          "A connecting word",
          "A word that replaces a noun",
        ],
        correctAnswer: 0,
        topic: "Grammar",
        difficulty: "easy",
        explanation: "An adjective describes or modifies a noun.",
      },
      {
        id: "4",
        question: "Choose the correct sentence:",
        options: [
          "She don't like apples",
          "She doesn't like apples",
          "She doesn't likes apples",
          "She don't likes apples",
        ],
        correctAnswer: 1,
        topic: "Grammar",
        difficulty: "medium",
        explanation: "Use 'doesn't' (does not) with third person singular.",
      },
      {
        id: "5",
        question: "What is the plural of 'child'?",
        options: ["childs", "childrens", "children", "childes"],
        correctAnswer: 2,
        topic: "Grammar",
        difficulty: "easy",
        explanation: "'Children' is the irregular plural form of 'child'.",
      },
      {
        id: "6",
        question: "What is a synonym?",
        options: [
          "A word with opposite meaning",
          "A word with similar meaning",
          "A made-up word",
          "A proper noun",
        ],
        correctAnswer: 1,
        topic: "Vocabulary",
        difficulty: "easy",
        explanation:
          "A synonym is a word that means the same or nearly the same as another word.",
      },
      {
        id: "7",
        question: "Identify the adverb: 'She ran quickly.'",
        options: ["She", "ran", "quickly", "none"],
        correctAnswer: 2,
        topic: "Grammar",
        difficulty: "medium",
        explanation: "'Quickly' is an adverb describing how she ran.",
      },
      {
        id: "8",
        question: "What is a pronoun?",
        options: [
          "A word that names something",
          "A word that replaces a noun",
          "A describing word",
          "An action word",
        ],
        correctAnswer: 1,
        topic: "Grammar",
        difficulty: "easy",
        explanation: "A pronoun replaces a noun (e.g., he, she, it, they).",
      },
      {
        id: "9",
        question: "Which is a proper noun?",
        options: ["city", "John", "book", "happy"],
        correctAnswer: 1,
        topic: "Grammar",
        difficulty: "easy",
        explanation:
          "John is a proper noun (specific name) and requires capitalization.",
      },
      {
        id: "10",
        question: "What is alliteration?",
        options: [
          "Repetition of vowel sounds",
          "Repetition of consonant sounds at the beginning of words",
          "A type of rhyme",
          "A metaphor",
        ],
        correctAnswer: 1,
        topic: "Literary Devices",
        difficulty: "medium",
        explanation:
          "Alliteration repeats consonant sounds (e.g., 'Peter Piper picked').",
      },
    ];

    // Physical Science Questions
    const physicalScienceQuestions = [
      {
        id: "1",
        question: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "H2O2"],
        correctAnswer: 0,
        topic: "Chemistry",
        difficulty: "easy",
        explanation:
          "Water is composed of 2 hydrogen atoms and 1 oxygen atom: H2O",
      },
      {
        id: "2",
        question: "What is the speed of light in a vacuum?",
        options: [
          "300,000 km/s",
          "150,000 km/s",
          "500,000 km/s",
          "100,000 km/s",
        ],
        correctAnswer: 0,
        topic: "Physics",
        difficulty: "medium",
        explanation:
          "Light travels at approximately 300,000 kilometers per second.",
      },
      {
        id: "3",
        question: "What is Newton's First Law of Motion?",
        options: [
          "Force equals mass times acceleration",
          "An object at rest stays at rest unless acted upon by a force",
          "For every action there is an equal and opposite reaction",
          "Energy cannot be created or destroyed",
        ],
        correctAnswer: 1,
        topic: "Physics",
        difficulty: "medium",
        explanation:
          "Newton's First Law states that objects resist changes in motion.",
      },
      {
        id: "4",
        question: "How many electrons does a carbon atom have?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 1,
        topic: "Chemistry",
        difficulty: "easy",
        explanation: "Carbon has atomic number 6, meaning 6 electrons.",
      },
      {
        id: "5",
        question: "What is the atomic number of Oxygen?",
        options: ["6", "7", "8", "9"],
        correctAnswer: 2,
        topic: "Chemistry",
        difficulty: "easy",
        explanation: "Oxygen has atomic number 8 (8 protons).",
      },
      {
        id: "6",
        question: "What state of matter is water at 25°C?",
        options: ["Solid", "Liquid", "Gas", "Plasma"],
        correctAnswer: 1,
        topic: "Matter",
        difficulty: "easy",
        explanation: "At 25°C (room temperature), water is in liquid state.",
      },
      {
        id: "7",
        question: "What is the formula for calculating force?",
        options: ["F = m × a", "F = m ÷ a", "F = m + a", "F = m - a"],
        correctAnswer: 0,
        topic: "Physics",
        difficulty: "medium",
        explanation: "Force = mass × acceleration (F = ma)",
      },
      {
        id: "8",
        question: "What is the pH of a neutral solution?",
        options: ["0", "7", "14", "10"],
        correctAnswer: 1,
        topic: "Chemistry",
        difficulty: "easy",
        explanation: "A neutral solution has pH 7 (neither acidic nor basic).",
      },
      {
        id: "9",
        question: "What is electricity?",
        options: [
          "Flow of water",
          "Flow of electrons",
          "Flow of protons",
          "Flow of neutrons",
        ],
        correctAnswer: 1,
        topic: "Physics",
        difficulty: "easy",
        explanation:
          "Electricity is the flow of electrons through a conductor.",
      },
      {
        id: "10",
        question: "What is the unit of electrical resistance?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correctAnswer: 2,
        topic: "Physics",
        difficulty: "medium",
        explanation: "Electrical resistance is measured in Ohms (Ω).",
      },
    ];

    // Add more subjects with similar structure...
    const lifeSciencesQuestions = [...physicalScienceQuestions].map((q, i) => ({
      ...q,
      id: `${i + 1}`,
      topic: "Biology",
    }));

    const historyQuestions = [...englishQuestions].map((q, i) => ({
      ...q,
      id: `${i + 1}`,
      topic: "History",
    }));

    const geographyQuestions = [...englishQuestions].map((q, i) => ({
      ...q,
      id: `${i + 1}`,
      topic: "Geography",
    }));

    const accountingQuestions = [...mathQuestions].map((q, i) => ({
      ...q,
      id: `${i + 1}`,
      topic: "Accounting",
    }));

    // Select questions based on subject
    let selectedQuestions = mathQuestions;

    if (subjectName.includes("math")) {
      selectedQuestions = mathQuestions;
    } else if (subjectName.includes("english")) {
      selectedQuestions = englishQuestions;
    } else if (subjectName.includes("physical")) {
      selectedQuestions = physicalScienceQuestions;
    } else if (subjectName.includes("life")) {
      selectedQuestions = lifeSciencesQuestions;
    } else if (subjectName.includes("history")) {
      selectedQuestions = historyQuestions;
    } else if (subjectName.includes("geography")) {
      selectedQuestions = geographyQuestions;
    } else if (subjectName.includes("accounting")) {
      selectedQuestions = accountingQuestions;
    }

    // Expand to 100 questions
    const expandedQuestions = [];
    for (let i = 0; i < 100; i++) {
      const baseQuestion = selectedQuestions[i % selectedQuestions.length];
      expandedQuestions.push({
        ...baseQuestion,
        id: `${i + 1}`,
        question: baseQuestion.question, // Remove "Q1:" prefix
      });
    }

    return expandedQuestions;
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      Alert.alert(
        "Please select an answer",
        "You must select an answer before proceeding."
      );
      return;
    }

    if (!currentQuestion) {
      Alert.alert("Error", "Question not found");
      return;
    }

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        question: currentQuestion.question,
        userAnswer: selectedAnswer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
        explanation: currentQuestion.explanation,
      },
    ]);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    } else {
      setTestComplete(true);
    }
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setAnsweredQuestions([]);
    setTestComplete(false);
    loadQuestionsFromAPI();
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Loading questions from server...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>📚</Text>
          <Text style={[styles.errorText, { color: theme.text }]}>
            No questions available for this topic yet.
          </Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.primary }]}
            onPress={loadQuestionsFromAPI}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
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
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={[styles.errorText, { color: theme.text }]}>
            Question not found. Please try again.
          </Text>
          <TouchableOpacity
            style={[styles.retryButton, { backgroundColor: theme.primary }]}
            onPress={handleRetry}
          >
            <Text style={styles.retryButtonText}>Restart Test</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.backButtonText, { color: theme.primary }]}>
              Go Back
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (testComplete) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: theme.text }]}>
              {topic.name} Test Complete! 🎉
            </Text>
            <View
              style={[styles.scoreCard, { backgroundColor: theme.surface }]}
            >
              <Text style={[styles.scoreText, { color: theme.text }]}>
                Your Score
              </Text>
              <Text style={[styles.scoreNumber, { color: theme.primary }]}>
                {score} / {questions.length}
              </Text>
              <Text style={[styles.percentageText, { color: theme.text }]}>
                {percentage}%
              </Text>
              <Text
                style={[styles.feedbackText, { color: theme.textSecondary }]}
              >
                {percentage >= 80
                  ? "Excellent work! 🌟"
                  : percentage >= 60
                  ? "Good job! Keep practicing! 👍"
                  : "Keep studying! You'll improve! 💪"}
              </Text>
            </View>

            {/* Review Section */}
            <View style={styles.reviewSection}>
              <Text style={[styles.reviewTitle, { color: theme.text }]}>
                Review Your Answers
              </Text>
              {answeredQuestions.map((item, index) => (
                <View
                  key={index}
                  style={[
                    styles.reviewCard,
                    {
                      backgroundColor: theme.surface,
                      borderColor: theme.border,
                    },
                  ]}
                >
                  <View style={styles.reviewHeader}>
                    <Text
                      style={[
                        styles.reviewQuestionNumber,
                        { color: theme.text },
                      ]}
                    >
                      Question {index + 1}
                    </Text>
                    <Text
                      style={[
                        styles.reviewStatus,
                        { color: item.isCorrect ? "#4CAF50" : "#F44336" },
                      ]}
                    >
                      {item.isCorrect ? "✓ Correct" : "✗ Wrong"}
                    </Text>
                  </View>
                  <Text style={[styles.reviewQuestion, { color: theme.text }]}>
                    {item.question}
                  </Text>
                  {item.explanation && (
                    <Text
                      style={[
                        styles.reviewExplanation,
                        { color: theme.textSecondary },
                      ]}
                    >
                      💡 {item.explanation}
                    </Text>
                  )}
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.primary }]}
              onPress={handleRetry}
            >
              <Text style={styles.buttonText}>Try Again</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.secondaryButton,
                { borderColor: theme.primary },
              ]}
              onPress={() => navigation.goBack()}
            >
              <Text
                style={[styles.secondaryButtonText, { color: theme.primary }]}
              >
                Back to Topics
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButtonHeader, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {subject.name} - {topic.name}
        </Text>
        <Text style={[styles.progress, { color: theme.textSecondary }]}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View
          style={[styles.topicBadge, { backgroundColor: subject.color + "20" }]}
        >
          <Text style={[styles.topicBadgeText, { color: subject.color }]}>
            {subject.icon} {currentQuestion.topic || topic.name}
          </Text>
        </View>

        {currentQuestion.difficulty && (
          <View style={styles.difficultyBadge}>
            <Text
              style={[
                styles.difficultyText,
                {
                  color:
                    currentQuestion.difficulty === "easy"
                      ? "#4CAF50"
                      : currentQuestion.difficulty === "medium"
                      ? "#FF9800"
                      : "#F44336",
                },
              ]}
            >
              {currentQuestion.difficulty.toUpperCase()}
            </Text>
          </View>
        )}

        <Text style={[styles.question, { color: theme.text }]}>
          {currentQuestion.question}
        </Text>

        <View style={styles.optionsContainer}>
          {currentQuestion.options &&
            currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.option,
                  {
                    backgroundColor: theme.surface,
                    borderColor:
                      selectedAnswer === index ? theme.primary : theme.border,
                    borderWidth: selectedAnswer === index ? 2 : 1,
                  },
                ]}
                onPress={() => handleAnswerSelect(index)}
              >
                <View
                  style={[
                    styles.optionCircle,
                    {
                      borderColor:
                        selectedAnswer === index ? theme.primary : theme.border,
                      backgroundColor:
                        selectedAnswer === index
                          ? theme.primary
                          : "transparent",
                    },
                  ]}
                >
                  {selectedAnswer === index && (
                    <Text style={styles.optionCheckmark}>✓</Text>
                  )}
                </View>
                <Text style={[styles.optionText, { color: theme.text }]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
        </View>

        <TouchableOpacity
          style={[
            styles.nextButton,
            {
              backgroundColor:
                selectedAnswer !== null ? theme.primary : theme.border,
            },
          ]}
          onPress={handleNext}
          disabled={selectedAnswer === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestionIndex < questions.length - 1
              ? "Next Question"
              : "Finish Test"}
          </Text>
        </TouchableOpacity>

        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
                backgroundColor: theme.primary,
              },
            ]}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    fontSize: 16,
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  retryButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
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
    elevation: 4,
  },
  backButtonHeader: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  progress: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topicBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  topicBadgeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  difficultyBadge: {
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  question: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 30,
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 30,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 1,
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
  optionCheckmark: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  nextButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    marginBottom: 20,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  progressBar: {
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 2,
  },
  resultsContainer: {
    padding: 20,
    alignItems: "center",
  },
  resultsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  scoreCard: {
    width: "100%",
    padding: 40,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
    elevation: 4,
  },
  scoreText: {
    fontSize: 18,
    marginBottom: 10,
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 10,
  },
  percentageText: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  reviewSection: {
    width: "100%",
    marginBottom: 20,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  reviewCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  reviewQuestionNumber: {
    fontSize: 14,
    fontWeight: "600",
  },
  reviewStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  reviewQuestion: {
    fontSize: 16,
    marginBottom: 8,
  },
  reviewExplanation: {
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 8,
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
});
