import React, { useContext } from "react";
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

export default function SubjectsScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();

  const subjects = [
    { id: "1", name: "Mathematics", icon: "🔢", color: "#FF6B6B" },
    { id: "2", name: "Science", icon: "🔬", color: "#4ECDC4" },
    { id: "3", name: "English", icon: "📚", color: "#95E1D3" },
    { id: "4", name: "History", icon: "📜", color: "#FFE66D" },
    { id: "5", name: "Geography", icon: "🌍", color: "#98D8C8" },
    { id: "6", name: "Life Sciences", icon: "🧬", color: "#F7B731" },
    { id: "7", name: "Physical Sciences", icon: "⚗️", color: "#5F27CD" },
    { id: "8", name: "Accounting", icon: "💰", color: "#00D2D3" },
    { id: "9", name: "Economics", icon: "📈", color: "#FF9FF3" },
    { id: "10", name: "Business Studies", icon: "💼", color: "#54A0FF" },
    { id: "11", name: "Sign Language", icon: "🤟", color: "#845EC2" },
  ];

  const handleSubjectPress = (subject) => {
    if (subject.name === "Sign Language") {
      navigation.navigate("SignLanguage");
    } else {
      navigation.navigate("SubjectDetails", {
        subject,
        grade: user?.grade || "12",
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          All Subjects
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Grade {user?.grade || "12"}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.subjectsContainer}>
          {subjects.map((subject) => (
            <TouchableOpacity
              key={subject.id}
              style={[
                styles.subjectCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: subject.color,
                },
              ]}
              onPress={() => handleSubjectPress(subject)}
            >
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: subject.color + "20" },
                ]}
              >
                <Text style={styles.subjectIcon}>{subject.icon}</Text>
              </View>
              <Text style={[styles.subjectName, { color: theme.text }]}>
                {subject.name}
              </Text>
              <View
                style={[
                  styles.arrowContainer,
                  { backgroundColor: subject.color },
                ]}
              >
                <Text style={styles.arrow}>›</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quick Actions
          </Text>
          <TouchableOpacity
            style={[styles.quickActionCard, { backgroundColor: theme.surface }]}
            onPress={() =>
              navigation.navigate("GradeSelection", { fromScreen: "Subjects" })
            }
          >
            <Text style={styles.quickActionIcon}>📝</Text>
            <View style={styles.quickActionContent}>
              <Text style={[styles.quickActionTitle, { color: theme.text }]}>
                Take All Subjects Test
              </Text>
              <Text
                style={[
                  styles.quickActionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Test your knowledge across all subjects
              </Text>
            </View>
            <Text style={[styles.quickActionArrow, { color: theme.primary }]}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.quickActionCard, { backgroundColor: theme.surface }]}
            onPress={() => navigation.navigate("Chatbot")}
          >
            <Text style={styles.quickActionIcon}>🤖</Text>
            <View style={styles.quickActionContent}>
              <Text style={[styles.quickActionTitle, { color: theme.text }]}>
                AI Study Assistant
              </Text>
              <Text
                style={[
                  styles.quickActionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                Get help with any subject
              </Text>
            </View>
            <Text style={[styles.quickActionArrow, { color: theme.primary }]}>
              ›
            </Text>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  subjectsContainer: {
    padding: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subjectCard: {
    width: "48%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  subjectIcon: {
    fontSize: 30,
  },
  subjectName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  arrowContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
  quickActionsSection: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  quickActionCard: {
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
  quickActionIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  quickActionDescription: {
    fontSize: 13,
  },
  quickActionArrow: {
    fontSize: 28,
    fontWeight: "bold",
  },
});
