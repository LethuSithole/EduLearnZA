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

const API_URL = "http://192.168.1.100:5000/api"; // Replace with your actual IP

// Create axios instance with custom config
const api = axios.create({
  baseURL: API_URL,
  timeout: 120000, // 2 minutes
  headers: {
    "Content-Type": "application/json",
  },
});

export default function TopicsScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { subject, grade } = route.params;
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async (retryCount = 0) => {
    try {
      setError(null);
      console.log(
        `Fetching topics for subject: ${subject.id}, grade: ${grade}`
      );

      const response = await api.get(
        `/questions/subjects/${subject.id}/topics`,
        {
          params: { grade },
        }
      );

      console.log("Topics fetched successfully:", response.data);
      setTopics(response.data);
    } catch (error) {
      console.error("Error fetching topics:", error.message);

      // Retry logic (max 2 retries)
      if (retryCount < 2 && error.code === "ECONNABORTED") {
        console.log(`Retrying... Attempt ${retryCount + 2}`);
        setTimeout(() => fetchTopics(retryCount + 1), 2000);
        return;
      }

      setError(error.message);

      // Use fallback topics based on subject
      const fallbackTopics = getFallbackTopics(subject.name);
      setTopics(fallbackTopics);

      // Show user-friendly message
      Alert.alert(
        "Using Offline Mode",
        "Couldn't connect to server. Using sample topics for now.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const getFallbackTopics = (subjectName) => {
    const topicsMap = {
      Mathematics: [
        { id: 1, name: "Algebra & Equations", questionCount: 25 },
        { id: 2, name: "Geometry & Mensuration", questionCount: 20 },
        { id: 3, name: "Trigonometry", questionCount: 18 },
        { id: 4, name: "Calculus", questionCount: 15 },
        { id: 5, name: "Statistics & Probability", questionCount: 22 },
        { id: 6, name: "Functions & Graphs", questionCount: 20 },
      ],
      "Physical Sciences": [
        { id: 1, name: "Mechanics", questionCount: 20 },
        { id: 2, name: "Electricity & Magnetism", questionCount: 18 },
        { id: 3, name: "Chemical Systems", questionCount: 22 },
        { id: 4, name: "Waves, Sound & Light", questionCount: 16 },
        { id: 5, name: "Matter & Materials", questionCount: 19 },
      ],
      "Life Sciences": [
        { id: 1, name: "Cell Biology", questionCount: 18 },
        { id: 2, name: "Genetics & Evolution", questionCount: 20 },
        { id: 3, name: "Human Biology", questionCount: 22 },
        { id: 4, name: "Ecology & Environment", questionCount: 17 },
        { id: 5, name: "Plant Biology", questionCount: 15 },
      ],
      English: [
        { id: 1, name: "Comprehension", questionCount: 25 },
        { id: 2, name: "Grammar & Language", questionCount: 30 },
        { id: 3, name: "Literature", questionCount: 20 },
        { id: 4, name: "Writing Skills", questionCount: 18 },
        { id: 5, name: "Poetry Analysis", questionCount: 15 },
      ],
      History: [
        { id: 1, name: "South African History", questionCount: 20 },
        { id: 2, name: "World Wars", questionCount: 18 },
        { id: 3, name: "Apartheid Era", questionCount: 22 },
        { id: 4, name: "Democracy & Human Rights", questionCount: 16 },
      ],
      Geography: [
        { id: 1, name: "Physical Geography", questionCount: 20 },
        { id: 2, name: "Map Work", questionCount: 18 },
        { id: 3, name: "Climate & Weather", questionCount: 16 },
        { id: 4, name: "Economic Geography", questionCount: 19 },
      ],
    };

    return (
      topicsMap[subjectName] || [
        { id: 1, name: "Introduction", questionCount: 20 },
        { id: 2, name: "Core Concepts", questionCount: 25 },
        { id: 3, name: "Advanced Topics", questionCount: 18 },
        { id: 4, name: "Practice & Review", questionCount: 22 },
      ]
    );
  };

  const handleTopicPress = (topic) => {
    navigation.navigate("TopicQuestions", {
      topic,
      subject,
      grade,
    });
  };

  const handleRetry = () => {
    setLoading(true);
    fetchTopics();
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Loading topics...
          </Text>
          <Text style={[styles.loadingSubtext, { color: theme.textSecondary }]}>
            This may take a moment
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.subjectIcon}>{subject.icon}</Text>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {subject.name}
          </Text>
        </View>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Grade {grade} • Select a topic to practice
        </Text>
      </View>

      {error && (
        <View style={[styles.errorBanner, { backgroundColor: "#FFF3CD" }]}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>Offline Mode: Using sample data</Text>
          <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.content}>
        {topics.map((topic, index) => (
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
            <View
              style={[
                styles.topicIconContainer,
                { backgroundColor: subject.color + "20" },
              ]}
            >
              <Text style={styles.topicIcon}>📝</Text>
            </View>
            <View style={styles.topicInfo}>
              <Text style={[styles.topicName, { color: theme.text }]}>
                {topic.name}
              </Text>
              <Text style={[styles.topicMeta, { color: theme.textSecondary }]}>
                {topic.questionCount || 0} questions available
              </Text>
            </View>
            <Text style={[styles.arrow, { color: subject.color }]}>→</Text>
          </TouchableOpacity>
        ))}

        {topics.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📚</Text>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No topics available yet
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
              Check back soon for new content!
            </Text>
            <TouchableOpacity
              style={[
                styles.backHomeButton,
                { backgroundColor: theme.primary },
              ]}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={styles.backHomeText}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        )}
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
    elevation: 4,
  },
  backButton: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 15,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  subjectIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 8,
  },
  errorIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: "#856404",
  },
  retryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#FFC107",
    borderRadius: 6,
  },
  retryText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#000",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  topicCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    elevation: 2,
  },
  topicIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  topicIcon: {
    fontSize: 24,
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
  arrow: {
    fontSize: 20,
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
    fontWeight: "600",
  },
  loadingSubtext: {
    marginTop: 5,
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    marginBottom: 20,
  },
  backHomeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backHomeText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
