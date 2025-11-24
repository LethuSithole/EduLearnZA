import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProgressScreen({ navigation }) {
  const themeContext = useTheme();
  const theme = themeContext?.theme || {
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#6200EE",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    border: "#e0e0e0",
  };

  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    averageScore: 0,
    bestScore: 0,
    timeSpent: 0,
    subjectStats: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      // Load progress from AsyncStorage
      const progressData = await AsyncStorage.getItem("quizProgress");

      if (progressData) {
        const progress = JSON.parse(progressData);
        setStats(progress);
      } else {
        // Initialize with demo data
        setStats({
          totalQuizzes: 12,
          totalQuestions: 240,
          correctAnswers: 180,
          averageScore: 75,
          bestScore: 95,
          timeSpent: 360, // minutes
          subjectStats: [
            {
              name: "Mathematics",
              icon: "🔢",
              color: "#2196F3",
              quizzesTaken: 5,
              averageScore: 78,
              totalQuestions: 100,
              correctAnswers: 78,
            },
            {
              name: "Physical Science",
              icon: "🧪",
              color: "#4CAF50",
              quizzesTaken: 3,
              averageScore: 82,
              totalQuestions: 60,
              correctAnswers: 49,
            },
            {
              name: "English",
              icon: "📚",
              color: "#FF5722",
              quizzesTaken: 2,
              averageScore: 70,
              totalQuestions: 40,
              correctAnswers: 28,
            },
            {
              name: "History",
              icon: "📜",
              color: "#9C27B0",
              quizzesTaken: 2,
              averageScore: 65,
              totalQuestions: 40,
              correctAnswers: 26,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error loading progress:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPerformanceColor = (score) => {
    if (score >= 80) return theme.success;
    if (score >= 60) return theme.warning;
    return theme.error;
  };

  const getPerformanceLabel = (score) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    if (score >= 40) return "Fair";
    return "Needs Work";
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Loading progress...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Your Progress
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Track your learning journey
          </Text>
        </View>

        {/* Overall Stats */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Overall Statistics
          </Text>
          <View style={styles.statsGrid}>
            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <Text style={styles.statIcon}>📊</Text>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stats.totalQuizzes}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Quizzes Taken
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <Text style={styles.statIcon}>❓</Text>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stats.totalQuestions}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Total Questions
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <Text style={styles.statIcon}>✅</Text>
              <Text style={[styles.statValue, { color: theme.success }]}>
                {stats.correctAnswers}
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Correct Answers
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <Text style={styles.statIcon}>📈</Text>
              <Text
                style={[
                  styles.statValue,
                  { color: getPerformanceColor(stats.averageScore) },
                ]}
              >
                {stats.averageScore}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Average Score
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <Text style={styles.statIcon}>🏆</Text>
              <Text style={[styles.statValue, { color: theme.success }]}>
                {stats.bestScore}%
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Best Score
              </Text>
            </View>

            <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
              <Text style={styles.statIcon}>⏱️</Text>
              <Text style={[styles.statValue, { color: theme.text }]}>
                {stats.timeSpent}m
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Time Spent
              </Text>
            </View>
          </View>
        </View>

        {/* Performance Overview */}
        <View style={styles.section}>
          <View
            style={[
              styles.performanceCard,
              {
                backgroundColor: getPerformanceColor(stats.averageScore) + "20",
              },
            ]}
          >
            <Text style={[styles.performanceTitle, { color: theme.text }]}>
              Performance Rating
            </Text>
            <Text
              style={[
                styles.performanceLabel,
                { color: getPerformanceColor(stats.averageScore) },
              ]}
            >
              {getPerformanceLabel(stats.averageScore)}
            </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[styles.progressBar, { backgroundColor: theme.border }]}
              >
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${stats.averageScore}%`,
                      backgroundColor: getPerformanceColor(stats.averageScore),
                    },
                  ]}
                />
              </View>
              <Text
                style={[styles.progressText, { color: theme.textSecondary }]}
              >
                {stats.correctAnswers} / {stats.totalQuestions} correct
              </Text>
            </View>
          </View>
        </View>

        {/* Subject Stats */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Performance by Subject
          </Text>
          {stats.subjectStats.map((subject, index) => (
            <View
              key={index}
              style={[styles.subjectCard, { backgroundColor: theme.surface }]}
            >
              <View style={styles.subjectHeader}>
                <View style={styles.subjectInfo}>
                  <Text style={styles.subjectIcon}>{subject.icon}</Text>
                  <View>
                    <Text style={[styles.subjectName, { color: theme.text }]}>
                      {subject.name}
                    </Text>
                    <Text
                      style={[
                        styles.subjectMeta,
                        { color: theme.textSecondary },
                      ]}
                    >
                      {subject.quizzesTaken} quizzes • {subject.totalQuestions}{" "}
                      questions
                    </Text>
                  </View>
                </View>
                <View style={styles.subjectScore}>
                  <Text
                    style={[
                      styles.scoreValue,
                      { color: getPerformanceColor(subject.averageScore) },
                    ]}
                  >
                    {subject.averageScore}%
                  </Text>
                  <Text
                    style={[styles.scoreLabel, { color: theme.textSecondary }]}
                  >
                    Avg Score
                  </Text>
                </View>
              </View>
              <View style={styles.subjectProgress}>
                <View
                  style={[
                    styles.progressBar,
                    { backgroundColor: theme.border },
                  ]}
                >
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${subject.averageScore}%`,
                        backgroundColor: subject.color,
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[styles.progressText, { color: theme.textSecondary }]}
                >
                  {subject.correctAnswers} / {subject.totalQuestions} correct
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Recent Achievements
          </Text>
          <View
            style={[styles.achievementCard, { backgroundColor: theme.surface }]}
          >
            <Text style={styles.achievementIcon}>🎯</Text>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementTitle, { color: theme.text }]}>
                Quiz Master
              </Text>
              <Text
                style={[styles.achievementDesc, { color: theme.textSecondary }]}
              >
                Completed 10+ quizzes
              </Text>
            </View>
            <View
              style={[
                styles.achievementBadge,
                { backgroundColor: theme.success + "20" },
              ]}
            >
              <Text
                style={[styles.achievementBadgeText, { color: theme.success }]}
              >
                Unlocked
              </Text>
            </View>
          </View>

          <View
            style={[styles.achievementCard, { backgroundColor: theme.surface }]}
          >
            <Text style={styles.achievementIcon}>⭐</Text>
            <View style={styles.achievementContent}>
              <Text style={[styles.achievementTitle, { color: theme.text }]}>
                High Scorer
              </Text>
              <Text
                style={[styles.achievementDesc, { color: theme.textSecondary }]}
              >
                Scored 90%+ on a quiz
              </Text>
            </View>
            <View
              style={[
                styles.achievementBadge,
                { backgroundColor: theme.success + "20" },
              ]}
            >
              <Text
                style={[styles.achievementBadgeText, { color: theme.success }]}
              >
                Unlocked
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Continue Learning Button */}
      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.continueButton, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.continueButtonText}>Continue Learning</Text>
        </TouchableOpacity>
      </View>
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
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  statCard: {
    width: "48%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: "center",
  },
  performanceCard: {
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  performanceTitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  performanceLabel: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  progressBarContainer: {
    width: "100%",
    gap: 8,
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
  progressText: {
    fontSize: 12,
    textAlign: "center",
  },
  subjectCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  subjectInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  subjectIcon: {
    fontSize: 32,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subjectMeta: {
    fontSize: 12,
  },
  subjectScore: {
    alignItems: "flex-end",
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scoreLabel: {
    fontSize: 10,
  },
  subjectProgress: {
    gap: 8,
  },
  achievementCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  achievementIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 12,
  },
  achievementBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  achievementBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  footer: {
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  continueButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
