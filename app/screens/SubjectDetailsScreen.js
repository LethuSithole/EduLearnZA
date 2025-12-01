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

export default function SubjectDetailsScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { subject, grade } = route.params;
  const [topics, setTopics] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubjectData();
  }, []);

  const fetchSubjectData = async () => {
    try {
      // Fetch topics with timeout
      const topicsResponse = await api.get(
        `/questions/subjects/${subject.id}/topics`,
        {
          params: { grade },
        }
      );
      setTopics(topicsResponse.data);

      // Fetch stats with timeout
      const statsResponse = await api.get(
        `/progress/subject/${subject.id}`,
        {
          params: { grade },
        }
      );
      setStats(statsResponse.data);
    } catch (error) {
      console.error("Error fetching subject data:", error);
      // Fallback data
      setTopics([
        { id: 1, name: "Algebra", questionCount: 25, completed: 10 },
        { id: 2, name: "Geometry", questionCount: 20, completed: 5 },
        { id: 3, name: "Trigonometry", questionCount: 18, completed: 0 },
        { id: 4, name: "Calculus", questionCount: 15, completed: 15 },
        { id: 5, name: "Statistics", questionCount: 22, completed: 8 },
      ]);
      setStats({
        totalQuestions: 100,
        completed: 38,
        accuracy: 85,
        timeSpent: 120,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTopicPress = (topic) => {
    navigation.navigate("Topics", { subject, grade });
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Loading subject details...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const progressPercentage = stats
    ? Math.round((stats.completed / stats.totalQuestions) * 100)
    : 0;

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
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.subjectIcon}>{subject.icon}</Text>
          <Text style={styles.headerTitle}>{subject.name}</Text>
          <Text style={styles.headerGrade}>Grade {grade}</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={styles.statIcon}>📊</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {progressPercentage}%
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Progress
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={styles.statIcon}>✅</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {stats?.completed || 0}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Completed
            </Text>
          </View>

          <View
            style={[
              styles.statCard,
              { backgroundColor: theme.surface, borderColor: theme.border },
            ]}
          >
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>
              {stats?.accuracy || 0}%
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Accuracy
            </Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: subject.color || theme.primary },
            ]}
            onPress={() => handleTopicPress()}
          >
            <Text style={styles.actionIcon}>🎯</Text>
            <Text style={styles.actionText}>Start Practicing</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButtonOutline,
              {
                borderColor: subject.color || theme.primary,
                backgroundColor: theme.surface,
              },
            ]}
            onPress={() =>
              Alert.alert(
                "Study Guide",
                "Coming soon! Access comprehensive study materials."
              )
            }
          >
            <Text style={styles.actionIcon}>📚</Text>
            <Text
              style={[
                styles.actionTextOutline,
                { color: subject.color || theme.primary },
              ]}
            >
              Study Guide
            </Text>
          </TouchableOpacity>
        </View>

        {/* Topics List */}
        <View style={styles.topicsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Topics ({topics.length})
          </Text>

          {topics.map((topic, index) => {
            const topicProgress = topic.completed
              ? Math.round((topic.completed / topic.questionCount) * 100)
              : 0;

            return (
              <TouchableOpacity
                key={topic.id || index}
                style={[
                  styles.topicCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => handleTopicPress(topic)}
              >
                <View style={styles.topicHeader}>
                  <View style={styles.topicInfo}>
                    <Text style={[styles.topicName, { color: theme.text }]}>
                      {topic.name}
                    </Text>
                    <Text
                      style={[styles.topicMeta, { color: theme.textSecondary }]}
                    >
                      {topic.questionCount} questions
                    </Text>
                  </View>
                  {topicProgress > 0 && (
                    <View
                      style={[
                        styles.progressBadge,
                        {
                          backgroundColor:
                            topicProgress === 100
                              ? "#4CAF50"
                              : subject.color || theme.primary,
                        },
                      ]}
                    >
                      <Text style={styles.progressBadgeText}>
                        {topicProgress}%
                      </Text>
                    </View>
                  )}
                </View>

                {/* Progress Bar */}
                <View
                  style={[
                    styles.progressBarContainer,
                    { backgroundColor: theme.border },
                  ]}
                >
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${topicProgress}%`,
                        backgroundColor: subject.color || theme.primary,
                      },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tips Section */}
        <View
          style={[
            styles.tipsBox,
            {
              backgroundColor: (subject.color || theme.primary) + "15",
              borderColor: subject.color || theme.primary,
            },
          ]}
        >
          <Text style={styles.tipsIcon}>💡</Text>
          <Text
            style={[
              styles.tipsTitle,
              { color: subject.color || theme.primary },
            ]}
          >
            Study Tips for {subject.name}
          </Text>
          <Text style={[styles.tipsText, { color: theme.text }]}>
            • Practice regularly for best results{"\n"}• Focus on weak areas
            first{"\n"}• Review explanations after each question{"\n"}• Take
            breaks between study sessions{"\n"}• Track your progress to stay
            motivated
          </Text>
        </View>

        <View style={styles.spacer} />
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
    paddingTop: 60,
    paddingBottom: 30,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  headerContent: {
    alignItems: "center",
  },
  subjectIcon: {
    fontSize: 64,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 5,
  },
  headerGrade: {
    fontSize: 16,
    color: "#FFF",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    elevation: 2,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 25,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    elevation: 3,
  },
  actionButtonOutline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  actionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  actionText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  actionTextOutline: {
    fontSize: 16,
    fontWeight: "600",
  },
  topicsSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  topicCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    elevation: 2,
  },
  topicHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  topicMeta: {
    fontSize: 13,
  },
  progressBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  progressBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  progressBarContainer: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  tipsBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
  },
  tipsIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 22,
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
  spacer: {
    height: 30,
  },
});
