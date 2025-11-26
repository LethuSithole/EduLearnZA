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

export default function SubjectDetailsScreen({ route, navigation }) {
  const { subject, grade } = route.params;
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  // Get topics based on subject
  const getTopicsBySubject = () => {
    if (subject?.name === "Sign Language") {
      return [
        {
          id: "1",
          name: "Alphabet (A-Z)",
          questionCount: 26,
          type: "learning",
        },
        {
          id: "2",
          name: "Numbers (0-10)",
          questionCount: 11,
          type: "learning",
        },
        {
          id: "3",
          name: "Basic Greetings",
          questionCount: 20,
          type: "learning",
        },
        { id: "4", name: "Common Words", questionCount: 50, type: "learning" },
        {
          id: "5",
          name: "Everyday Phrases",
          questionCount: 30,
          type: "learning",
        },
      ];
    } else if (subject?.name === "Mathematics") {
      return [
        { id: "1", name: "Algebra", questionCount: 100 },
        { id: "2", name: "Geometry", questionCount: 100 },
        { id: "3", name: "Calculus", questionCount: 100 },
        { id: "4", name: "Statistics", questionCount: 100 },
        { id: "5", name: "Trigonometry", questionCount: 100 },
      ];
    } else {
      return [
        { id: "1", name: "Topic 1", questionCount: 100 },
        { id: "2", name: "Topic 2", questionCount: 100 },
        { id: "3", name: "Topic 3", questionCount: 100 },
      ];
    }
  };

  const topics = getTopicsBySubject();

  const handleTopicPress = (topic) => {
    // Now this should work since TopicQuestions is in the same Stack Navigator
    navigation.navigate("TopicQuestions", {
      subject,
      topic,
      grade,
    });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {subject?.icon} {subject?.name || "Subject"}
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          {subject?.name === "Sign Language"
            ? "Select a topic to learn"
            : "Select a topic to view questions"}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Topics
          </Text>
          {topics.map((topic) => (
            <TouchableOpacity
              key={topic.id}
              style={[
                styles.topicCard,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
              onPress={() => handleTopicPress(topic)}
            >
              <View style={styles.topicInfo}>
                <Text style={[styles.topicName, { color: theme.text }]}>
                  {topic.name}
                </Text>
                <Text
                  style={[styles.questionCount, { color: theme.textSecondary }]}
                >
                  {topic.type === "learning"
                    ? `${topic.questionCount} Lessons`
                    : `${topic.questionCount} Questions`}
                </Text>
              </View>
              <Text style={[styles.arrow, { color: theme.primary }]}>→</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    paddingBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  topicCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  questionCount: {
    fontSize: 14,
  },
  arrow: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
