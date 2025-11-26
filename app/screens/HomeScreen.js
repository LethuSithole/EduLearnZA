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
  const { theme } = useTheme();
  const navigation = useNavigation();

  const subjects = [
    { id: "1", name: "Mathematics", icon: "🔢", color: "#FF6B6B" },
    { id: "2", name: "Science", icon: "🔬", color: "#4ECDC4" },
    { id: "3", name: "English", icon: "📚", color: "#95E1D3" },
    { id: "4", name: "History", icon: "📜", color: "#FFE66D" },
    { id: "5", name: "Geography", icon: "🌍", color: "#98D8C8" },
    { id: "6", name: "Sign Language", icon: "🤟", color: "#845EC2" },
  ];

  // Study materials for quick access
  const studyMaterials = [
    { id: "1", name: "Mathematics", icon: "🔢", color: "#FF6B6B" },
    { id: "2", name: "Science", icon: "🔬", color: "#4ECDC4" },
    { id: "3", name: "English", icon: "📚", color: "#95E1D3" },
    { id: "4", name: "Sign Language", icon: "🤟", color: "#845EC2" },
  ];

  const handleSubjectPress = (subject) => {
    // Check if Sign Language and navigate accordingly
    if (subject.name === "Sign Language") {
      navigation.navigate("SignLanguage"); // Make sure this matches the screen name in App.js
    } else {
      // Navigate to SubjectDetails to show topics
      navigation.navigate("SubjectDetails", {
        subject,
        grade: user?.grade || "12",
      });
    }
  };

  const handleQuickTest = () => {
    // Navigate to grade selection first
    navigation.navigate("GradeSelection", {
      fromScreen: "Home",
    });
  };

  const handleLearnMore = () => {
    // Navigate to LearnMoreScreen with Mathematics as default
    const mathSubject = subjects[0];
    navigation.navigate("LearnMore", {
      subject: mathSubject,
      grade: user?.grade || "12",
    });
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
              <Text style={styles.actionIcon}>📖</Text>
              <Text style={[styles.actionText, { color: theme.text }]}>
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Study Materials - Featured Subjects */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Study Materials
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {studyMaterials.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                style={[
                  styles.materialCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: subject.color,
                  },
                ]}
                onPress={() => handleSubjectPress(subject)}
              >
                <Text style={styles.materialIcon}>{subject.icon}</Text>
                <Text style={[styles.materialName, { color: theme.text }]}>
                  {subject.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Subjects */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            All Subjects
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
    textAlign: "center",
  },
  horizontalScroll: {
    marginBottom: 10,
  },
  materialCard: {
    width: 120,
    padding: 15,
    borderRadius: 12,
    marginRight: 12,
    alignItems: "center",
    borderWidth: 2,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  materialIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  materialName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
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
