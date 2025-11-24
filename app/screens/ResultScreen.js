import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { submitQuizResult } from "../config/quizApi";

export default function ResultScreen({ navigation, route }) {
  const { subject, topic, score, totalQuestions, percentage, answers } =
    route.params || {};
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);

  const passed = parseFloat(percentage) >= 50;

  useEffect(() => {
    // Submit results to backend
    submitResults();
  }, []);

  const submitResults = async () => {
    try {
      if (user?.uid) {
        await submitQuizResult(
          user.uid,
          subject?.name || "Unknown",
          topic?.name || "Unknown",
          score,
          totalQuestions,
          answers
        );
        console.log("✅ Results submitted successfully");
      }
    } catch (error) {
      console.log(
        "⚠️ Failed to submit results (using offline mode):",
        error.message
      );
      // Don't show error to user, just log it
    }
  };

  const getGrade = () => {
    if (percentage >= 80) return { grade: "A", color: "#4CAF50" };
    if (percentage >= 70) return { grade: "B", color: "#8BC34A" };
    if (percentage >= 60) return { grade: "C", color: "#FFC107" };
    if (percentage >= 50) return { grade: "D", color: "#FF9800" };
    return { grade: "F", color: "#F44336" };
  };

  const gradeInfo = getGrade();

  const handleGoHome = () => {
    // Navigate back to the root of the stack
    navigation.popToTop();
  };

  const handleTryAgain = () => {
    // Go back to SubjectDetails
    navigation.navigate("SubjectDetails", { subject });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Result Header */}
        <View style={[styles.resultHeader, { backgroundColor: theme.surface }]}>
          <Text style={[styles.resultTitle, { color: theme.text }]}>
            {passed ? "🎉 Congratulations!" : "📚 Keep Practicing!"}
          </Text>
          <Text style={[styles.resultSubtitle, { color: theme.textSecondary }]}>
            {subject?.name} - {topic?.name}
          </Text>

          {/* Score Circle */}
          <View style={styles.scoreCircle}>
            <View
              style={[
                styles.scoreCircleInner,
                { borderColor: passed ? "#4CAF50" : "#FF6B6B" },
              ]}
            >
              <Text
                style={[
                  styles.scorePercentage,
                  { color: passed ? "#4CAF50" : "#FF6B6B" },
                ]}
              >
                {percentage}%
              </Text>
              <Text style={[styles.scoreLabel, { color: theme.textSecondary }]}>
                {score}/{totalQuestions}
              </Text>
            </View>
          </View>

          {/* Grade */}
          <View
            style={[
              styles.gradeBadge,
              { backgroundColor: gradeInfo.color + "20" },
            ]}
          >
            <Text style={[styles.gradeText, { color: gradeInfo.color }]}>
              Grade: {gradeInfo.grade}
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Statistics
          </Text>
          <View style={[styles.statsCard, { backgroundColor: theme.surface }]}>
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                ✅ Correct
              </Text>
              <Text style={[styles.statValue, { color: "#4CAF50" }]}>
                {score}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                ❌ Incorrect
              </Text>
              <Text style={[styles.statValue, { color: "#F44336" }]}>
                {totalQuestions - score}
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                📊 Total Questions
              </Text>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {totalQuestions}
              </Text>
            </View>
          </View>
        </View>

        {/* Review Answers */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Review Answers
          </Text>
          {answers?.map((answer, index) => (
            <View
              key={index}
              style={[
                styles.answerCard,
                {
                  backgroundColor: theme.surface,
                  borderLeftColor: answer.correct ? "#4CAF50" : "#F44336",
                },
              ]}
            >
              <View style={styles.answerHeader}>
                <Text style={[styles.questionNumber, { color: theme.text }]}>
                  Q{index + 1}
                </Text>
                <Text
                  style={[
                    styles.answerStatus,
                    { color: answer.correct ? "#4CAF50" : "#F44336" },
                  ]}
                >
                  {answer.correct ? "✓ Correct" : "✗ Incorrect"}
                </Text>
              </View>
              <Text style={[styles.questionText, { color: theme.text }]}>
                {answer.question}
              </Text>
              <View style={styles.answerInfo}>
                <Text
                  style={[styles.answerLabel, { color: theme.textSecondary }]}
                >
                  Your answer:{" "}
                  <Text
                    style={{
                      color: answer.correct ? "#4CAF50" : "#F44336",
                      fontWeight: "bold",
                    }}
                  >
                    {answer.userAnswer}
                  </Text>
                </Text>
                {!answer.correct && (
                  <Text
                    style={[styles.answerLabel, { color: theme.textSecondary }]}
                  >
                    Correct answer:{" "}
                    <Text style={{ color: "#4CAF50", fontWeight: "bold" }}>
                      {answer.correctAnswer}
                    </Text>
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.secondaryButton, { borderColor: theme.border }]}
          onPress={handleGoHome}
        >
          <Text style={[styles.secondaryButtonText, { color: theme.text }]}>
            Go Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.primaryButton, { backgroundColor: theme.primary }]}
          onPress={handleTryAgain}
        >
          <Text style={styles.primaryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  resultHeader: {
    padding: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  resultSubtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
  },
  scoreCircle: {
    alignItems: "center",
    marginBottom: 20,
  },
  scoreCircleInner: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  scorePercentage: {
    fontSize: 48,
    fontWeight: "bold",
  },
  scoreLabel: {
    fontSize: 16,
    marginTop: 5,
  },
  gradeBadge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
  },
  gradeText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statsCard: {
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  statLabel: {
    fontSize: 16,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  answerCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
  },
  answerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  questionNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  answerStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  questionText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  answerInfo: {
    gap: 8,
  },
  answerLabel: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  secondaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  primaryButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
