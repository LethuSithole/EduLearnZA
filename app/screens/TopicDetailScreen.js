import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function TopicDetailScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { subject, topic } = route.params;

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
        <View style={styles.headerContent}>
          <Text style={styles.subjectIcon}>{subject.icon}</Text>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {topic.name}
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            {subject.name}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Topic Description */}
        <View
          style={[styles.descriptionCard, { backgroundColor: theme.surface }]}
        >
          <Text style={[styles.descriptionTitle, { color: theme.text }]}>
            📖 About This Topic
          </Text>
          <Text
            style={[styles.descriptionText, { color: theme.textSecondary }]}
          >
            {topic.description ||
              `Learn everything about ${topic.name} in ${subject.name}. Practice with quizzes and improve your understanding.`}
          </Text>
        </View>

        {/* Study Options */}
        <View style={styles.optionsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            📚 Study Options
          </Text>

          {/* Practice Quiz */}
          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: theme.surface }]}
            onPress={() =>
              navigation.navigate("TopicQuestions", {
                subject: subject,
                topic: topic,
              })
            }
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.optionIconContainer,
                { backgroundColor: "#4CAF50" },
              ]}
            >
              <Text style={styles.optionIcon}>📝</Text>
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Practice Quiz
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Test your knowledge with practice questions
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>

          {/* Study Materials */}
          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: theme.surface }]}
            onPress={() => {
              // Navigate to study materials or show coming soon
              alert("Study materials coming soon!");
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.optionIconContainer,
                { backgroundColor: "#2196F3" },
              ]}
            >
              <Text style={styles.optionIcon}>📚</Text>
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Study Notes
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Read comprehensive notes and explanations
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>

          {/* Video Lessons */}
          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: theme.surface }]}
            onPress={() => {
              alert("Video lessons coming soon!");
            }}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.optionIconContainer,
                { backgroundColor: "#FF5722" },
              ]}
            >
              <Text style={styles.optionIcon}>🎥</Text>
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                Video Lessons
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Watch engaging video tutorials
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>

          {/* AI Assistant */}
          <TouchableOpacity
            style={[styles.optionCard, { backgroundColor: theme.surface }]}
            onPress={() => navigation.navigate("Chatbot")}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.optionIconContainer,
                { backgroundColor: "#9C27B0" },
              ]}
            >
              <Text style={styles.optionIcon}>🤖</Text>
            </View>
            <View style={styles.optionContent}>
              <Text style={[styles.optionTitle, { color: theme.text }]}>
                AI Study Assistant
              </Text>
              <Text
                style={[
                  styles.optionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Get instant help with your questions
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tips Section */}
        <View style={[styles.tipsCard, { backgroundColor: "#E8F5E9" }]}>
          <Text style={styles.tipsIcon}>💡</Text>
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Study Tips</Text>
            <Text style={styles.tipsText}>
              • Start with practice quizzes to assess your knowledge{"\n"}•
              Review incorrect answers to learn from mistakes{"\n"}• Use the AI
              assistant for difficult concepts{"\n"}• Practice regularly for
              better retention
            </Text>
          </View>
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
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginBottom: 15,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerContent: {
    alignItems: "center",
  },
  subjectIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  descriptionCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
  },
  optionsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  optionIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  optionIcon: {
    fontSize: 24,
  },
  optionContent: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  arrow: {
    fontSize: 24,
    marginLeft: 10,
  },
  tipsCard: {
    margin: 20,
    marginTop: 10,
    padding: 20,
    borderRadius: 16,
    flexDirection: "row",
    elevation: 2,
  },
  tipsIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  tipsContent: {
    flex: 1,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#1B5E20",
  },
});
