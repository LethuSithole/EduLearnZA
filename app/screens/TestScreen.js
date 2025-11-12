import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const testHistory = [
  {
    id: 1,
    subject: "Mathematics",
    topic: "Algebra",
    score: 85,
    totalQuestions: 20,
    date: "2024-11-10",
    duration: "25 mins",
  },
  {
    id: 2,
    subject: "Science",
    topic: "Biology",
    score: 92,
    totalQuestions: 15,
    date: "2024-11-09",
    duration: "20 mins",
  },
  {
    id: 3,
    subject: "English",
    topic: "Grammar",
    score: 78,
    totalQuestions: 25,
    date: "2024-11-08",
    duration: "30 mins",
  },
];

export default function TestScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const themeContext = useTheme();
  const theme = themeContext?.theme || {
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#6200EE",
    success: "#4CAF50",
    warning: "#FFC107",
    error: "#F44336",
  };
  const [selectedTab, setSelectedTab] = useState("available");

  const handleStartTest = () => {
    navigation.navigate("Study");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Tests</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Track your progress and take new tests
        </Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "available" && styles.activeTab,
            { backgroundColor: theme.surface },
          ]}
          onPress={() => setSelectedTab("available")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "available" && styles.activeTabText,
              { color: theme.text },
            ]}
          >
            Available
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === "history" && styles.activeTab,
            { backgroundColor: theme.surface },
          ]}
          onPress={() => setSelectedTab("history")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "history" && styles.activeTabText,
              { color: theme.text },
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedTab === "available" ? (
          <View style={styles.availableContainer}>
            <View
              style={[styles.startTestCard, { backgroundColor: theme.surface }]}
            >
              <Text style={styles.startTestIcon}>📝</Text>
              <Text style={[styles.startTestTitle, { color: theme.text }]}>
                Ready to Test Your Knowledge?
              </Text>
              <Text
                style={[
                  styles.startTestDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Choose a subject and topic from Study Materials to begin
              </Text>
              <TouchableOpacity
                style={styles.startButton}
                onPress={handleStartTest}
              >
                <Text style={styles.startButtonText}>Browse Subjects</Text>
              </TouchableOpacity>
            </View>

            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Quick Stats
            </Text>
            <View style={styles.statsGrid}>
              <View
                style={[styles.statCard, { backgroundColor: theme.surface }]}
              >
                <Text style={styles.statNumber}>{testHistory.length}</Text>
                <Text
                  style={[styles.statLabel, { color: theme.textSecondary }]}
                >
                  Tests Taken
                </Text>
              </View>
              <View
                style={[styles.statCard, { backgroundColor: theme.surface }]}
              >
                <Text style={[styles.statNumber, { color: theme.success }]}>
                  {Math.round(
                    testHistory.reduce((acc, test) => acc + test.score, 0) /
                      testHistory.length
                  )}
                  %
                </Text>
                <Text
                  style={[styles.statLabel, { color: theme.textSecondary }]}
                >
                  Avg Score
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.historyContainer}>
            {testHistory.map((test) => (
              <View
                key={test.id}
                style={[styles.historyCard, { backgroundColor: theme.surface }]}
              >
                <View style={styles.historyHeader}>
                  <View style={styles.historyInfo}>
                    <Text
                      style={[styles.historySubject, { color: theme.text }]}
                    >
                      {test.subject}
                    </Text>
                    <Text
                      style={[
                        styles.historyTopic,
                        { color: theme.textSecondary },
                      ]}
                    >
                      {test.topic}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.scoreCircle,
                      {
                        backgroundColor:
                          test.score >= 80
                            ? theme.success
                            : test.score >= 60
                            ? theme.warning
                            : theme.error,
                      },
                    ]}
                  >
                    <Text style={styles.scoreText}>{test.score}%</Text>
                  </View>
                </View>
                <View style={styles.historyFooter}>
                  <Text
                    style={[
                      styles.historyDetail,
                      { color: theme.textSecondary },
                    ]}
                  >
                    📅 {test.date}
                  </Text>
                  <Text
                    style={[
                      styles.historyDetail,
                      { color: theme.textSecondary },
                    ]}
                  >
                    ⏱️ {test.duration}
                  </Text>
                  <Text
                    style={[
                      styles.historyDetail,
                      { color: theme.textSecondary },
                    ]}
                  >
                    ✅ {Math.round((test.score / 100) * test.totalQuestions)}/
                    {test.totalQuestions}
                  </Text>
                </View>
              </View>
            ))}
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
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  activeTab: {
    backgroundColor: "#6200EE",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  availableContainer: {
    paddingBottom: 20,
  },
  startTestCard: {
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    marginBottom: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  startTestIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  startTestTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  startTestDescription: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: "#6200EE",
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 10,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
  },
  historyContainer: {
    paddingBottom: 20,
  },
  historyCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historySubject: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  historyTopic: {
    fontSize: 14,
  },
  scoreCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  historyFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyDetail: {
    fontSize: 12,
  },
});
