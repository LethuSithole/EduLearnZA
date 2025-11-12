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
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const themeContext = useTheme();
  const theme = themeContext?.theme || {
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#6200EE",
  };
  const navigation = useNavigation();

  const subjects = [
    { id: "1", name: "Mathematics", icon: "🔢", color: "#FF6B6B" },
    { id: "2", name: "Science", icon: "🔬", color: "#4ECDC4" },
    { id: "3", name: "English", icon: "📚", color: "#95E1D3" },
    { id: "4", name: "History", icon: "📜", color: "#FFE66D" },
    { id: "5", name: "Geography", icon: "🌍", color: "#98D8C8" },
    { id: "6", name: "Programming", icon: "💻", color: "#845EC2" },
  ];

  const handleSubjectPress = (subject) => {
    // Use getParent() to navigate to screens outside the tab navigator
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate("TakeTest", {
        subject,
        grade: user?.grade || "12",
      });
    }
  };

  const handleQuickTest = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate("TakeTest", {
        grade: user?.grade || "12",
      });
    }
  };

  const handleLearnMore = () => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate("LearnMore", {
        grade: user?.grade || "12",
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.greeting, { color: theme.textSecondary }]}>
            Welcome back,
          </Text>
          <Text style={[styles.userName, { color: theme.text }]}>
            {user?.displayName || "Student"}! 👋
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Grade {user?.grade || "12"}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quick Actions
          </Text>
          <View style={styles.quickActions}>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: theme.surface }]}
              onPress={handleQuickTest}
            >
              <Text style={styles.actionIcon}>📝</Text>
              <Text style={[styles.actionText, { color: theme.text }]}>
                Take Test
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionCard, { backgroundColor: theme.surface }]}
              onPress={handleLearnMore}
            >
              <Text style={styles.actionIcon}>📚</Text>
              <Text style={[styles.actionText, { color: theme.text }]}>
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Subjects */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Choose a Subject
          </Text>
          <View style={styles.subjectsGrid}>
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
                <Text style={styles.subjectIcon}>{subject.icon}</Text>
                <Text style={[styles.subjectName, { color: theme.text }]}>
                  {subject.name}
                </Text>
              </TouchableOpacity>
            ))}
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
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 16,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 5,
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
  quickActions: {
    flexDirection: "row",
    gap: 15,
  },
  actionCard: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subjectCard: {
    width: "48%",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subjectIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
