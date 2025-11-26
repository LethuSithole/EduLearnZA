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

export default function SubjectDetailScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { subject } = route.params;

  const topics = subject.topics || [];

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
            {subject.name}
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Subject Info */}
        <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
          <Text style={[styles.infoTitle, { color: theme.text }]}>
            About {subject.name}
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            Explore comprehensive study materials and practice tests for{" "}
            {subject.name}. Select a topic below to get started.
          </Text>
        </View>

        {/* Topics List */}
        <View style={styles.topicsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            📚 Topics
          </Text>
          {topics.length > 0 ? (
            topics.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.topicCard, { backgroundColor: theme.surface }]}
                onPress={() =>
                  navigation.navigate("TopicDetail", {
                    subject: subject,
                    topic: topic,
                  })
                }
                activeOpacity={0.7}
              >
                <View style={styles.topicLeft}>
                  <View
                    style={[
                      styles.topicNumber,
                      { backgroundColor: theme.primary },
                    ]}
                  >
                    <Text style={styles.topicNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.topicInfo}>
                    <Text style={[styles.topicName, { color: theme.text }]}>
                      {topic.name}
                    </Text>
                    {topic.description && (
                      <Text
                        style={[
                          styles.topicDescription,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {topic.description}
                      </Text>
                    )}
                  </View>
                </View>
                <Text style={[styles.arrow, { color: theme.textSecondary }]}>
                  →
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <View
              style={[styles.emptyCard, { backgroundColor: theme.surface }]}
            >
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                No topics available yet
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            ⚡ Quick Actions
          </Text>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.surface }]}
            onPress={() =>
              navigation.navigate("AllSubjectsTest", {
                subject: subject,
                topic: null,
              })
            }
          >
            <Text style={styles.actionIcon}>📝</Text>
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, { color: theme.text }]}>
                Take Full Test
              </Text>
              <Text
                style={[
                  styles.actionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Practice with questions from all topics
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: theme.surface }]}
            onPress={() => navigation.navigate("Chatbot")}
          >
            <Text style={styles.actionIcon}>🤖</Text>
            <View style={styles.actionContent}>
              <Text style={[styles.actionTitle, { color: theme.text }]}>
                AI Study Assistant
              </Text>
              <Text
                style={[
                  styles.actionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Get help with {subject.name} questions
              </Text>
            </View>
          </TouchableOpacity>
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
  },
  scrollView: {
    flex: 1,
  },
  infoCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
  },
  topicsSection: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 22,
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topicLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  topicNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  topicNumberText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  arrow: {
    fontSize: 24,
    marginLeft: 10,
  },
  emptyCard: {
    padding: 40,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  emptyIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
  },
  actionsSection: {
    padding: 20,
    paddingTop: 0,
  },
  actionCard: {
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
  actionIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
