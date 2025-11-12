import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const subjects = [
  { id: 1, name: "Mathematics", icon: "📐", color: "#FF6B6B" },
  { id: 2, name: "Science", icon: "🔬", color: "#4ECDC4" },
  { id: 3, name: "English", icon: "📚", color: "#95E1D3" },
  { id: 4, name: "History", icon: "📜", color: "#FFE66D" },
  { id: 5, name: "Geography", icon: "🌍", color: "#A8E6CF" },
  { id: 6, name: "Programming", icon: "💻", color: "#845EC2" },
];

const topics = {
  Mathematics: ["Algebra", "Geometry", "Calculus", "Statistics"],
  Science: ["Biology", "Chemistry", "Physics"],
  English: ["Grammar", "Literature", "Writing", "Reading"],
  History: ["World War I", "World War II", "Ancient History", "Modern History"],
  Geography: ["Physical Geography", "Human Geography", "Climate", "Maps"],
  Programming: ["Python", "JavaScript", "Web Development", "Data Structures"],
};

export default function StudyScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const themeContext = useTheme();
  const theme = themeContext?.theme || {
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#6200EE",
    placeholderText: "#999999",
  };
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubjectPress = (subject) => {
    setSelectedSubject(subject.name);
  };

  const handleTopicPress = (subject, topic) => {
    const parentNav = navigation.getParent();
    if (parentNav) {
      parentNav.navigate("TakeTest", {
        subject: { name: subject },
        topic: topic,
        grade: user?.grade || "12",
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Study Materials
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Choose a subject to start learning
        </Text>
      </View>

      <View
        style={[styles.searchContainer, { backgroundColor: theme.surface }]}
      >
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={[styles.searchInput, { color: theme.text }]}
          placeholder="Search subjects..."
          placeholderTextColor={theme.placeholderText}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {!selectedSubject ? (
          <View style={styles.subjectsGrid}>
            {filteredSubjects.map((subject) => (
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
                <View
                  style={[
                    styles.subjectBadge,
                    { backgroundColor: subject.color },
                  ]}
                >
                  <Text style={styles.subjectBadgeText}>
                    {topics[subject.name]?.length || 0} topics
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.topicsContainer}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedSubject(null)}
            >
              <Text style={styles.backButtonText}>← Back to Subjects</Text>
            </TouchableOpacity>

            <Text style={[styles.topicsTitle, { color: theme.text }]}>
              {selectedSubject} Topics
            </Text>

            {topics[selectedSubject]?.map((topic, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.topicCard, { backgroundColor: theme.surface }]}
                onPress={() => handleTopicPress(selectedSubject, topic)}
              >
                <View style={styles.topicContent}>
                  <Text style={[styles.topicName, { color: theme.text }]}>
                    {topic}
                  </Text>
                  <Text
                    style={[
                      styles.topicDescription,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Study materials and practice questions
                  </Text>
                </View>
                <Text
                  style={[styles.topicArrow, { color: theme.textSecondary }]}
                >
                  →
                </Text>
              </TouchableOpacity>
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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  subjectCard: {
    width: "48%",
    borderRadius: 16,
    padding: 20,
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
    fontSize: 48,
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subjectBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 5,
  },
  subjectBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  topicsContainer: {
    paddingBottom: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: "#6200EE",
    fontSize: 16,
    fontWeight: "600",
  },
  topicsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  topicCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  topicContent: {
    flex: 1,
  },
  topicName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  topicDescription: {
    fontSize: 14,
  },
  topicArrow: {
    fontSize: 24,
    marginLeft: 10,
  },
});
