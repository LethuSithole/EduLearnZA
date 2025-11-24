import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function AllSubjectsTestScreen({ navigation, route }) {
  const { grade } = route.params || {};
  const { theme } = useTheme();
  const [expandedSubject, setExpandedSubject] = useState(null);

  const getQuestionCountByGrade = (baseCount, gradeLevel) => {
    const gradeNum = parseInt(gradeLevel);
    if (gradeNum <= 8) return Math.floor(baseCount * 0.7); // 70% for Grade 8
    if (gradeNum === 9) return Math.floor(baseCount * 0.8); // 80% for Grade 9
    if (gradeNum === 10) return Math.floor(baseCount * 0.9); // 90% for Grade 10
    return baseCount; // 100% for Grade 11 & 12
  };

  const subjects = [
    {
      id: "1",
      name: "Mathematics",
      icon: "🔢",
      color: "#FF6B6B",
      topics: [
        { name: "Algebra", questions: getQuestionCountByGrade(100, grade) },
        { name: "Geometry", questions: getQuestionCountByGrade(100, grade) },
        { name: "Calculus", questions: getQuestionCountByGrade(100, grade) },
        { name: "Statistics", questions: getQuestionCountByGrade(100, grade) },
        {
          name: "Trigonometry",
          questions: getQuestionCountByGrade(100, grade),
        },
      ],
    },
    {
      id: "2",
      name: "Science",
      icon: "🔬",
      color: "#4ECDC4",
      topics: [
        { name: "Chemistry", questions: getQuestionCountByGrade(100, grade) },
        { name: "Physics", questions: getQuestionCountByGrade(100, grade) },
        { name: "Biology", questions: getQuestionCountByGrade(100, grade) },
      ],
    },
    {
      id: "3",
      name: "English",
      icon: "📚",
      color: "#95E1D3",
      topics: [
        { name: "Grammar", questions: getQuestionCountByGrade(100, grade) },
        { name: "Literature", questions: getQuestionCountByGrade(100, grade) },
        { name: "Vocabulary", questions: getQuestionCountByGrade(100, grade) },
      ],
    },
    {
      id: "4",
      name: "History",
      icon: "📜",
      color: "#FFE66D",
      topics: [
        {
          name: "World History",
          questions: getQuestionCountByGrade(100, grade),
        },
        {
          name: "South African History",
          questions: getQuestionCountByGrade(100, grade),
        },
      ],
    },
    {
      id: "5",
      name: "Geography",
      icon: "🌍",
      color: "#98D8C8",
      topics: [
        {
          name: "World Geography",
          questions: getQuestionCountByGrade(100, grade),
        },
        {
          name: "South African Geography",
          questions: getQuestionCountByGrade(100, grade),
        },
      ],
    },
  ];

  const handleSubjectPress = (subjectId) => {
    setExpandedSubject(expandedSubject === subjectId ? null : subjectId);
  };

  const handleTopicPress = (subject, topic) => {
    navigation.navigate("TopicQuestions", {
      subject,
      topic,
      grade,
    });
  };

  const handleStartAllTopics = (subject) => {
    // Navigate to first topic of the subject
    if (subject.topics && subject.topics.length > 0) {
      navigation.navigate("TopicQuestions", {
        subject,
        topic: subject.topics[0],
        grade,
      });
    }
  };

  const getDifficultyLabel = (gradeLevel) => {
    const gradeNum = parseInt(gradeLevel);
    if (gradeNum <= 8) return "⭐ Easy";
    if (gradeNum === 9 || gradeNum === 10) return "⭐⭐ Medium";
    return "⭐⭐⭐ Hard";
  };

  const getDifficultyColor = (gradeLevel) => {
    const gradeNum = parseInt(gradeLevel);
    if (gradeNum <= 8) return "#4CAF50"; // Green
    if (gradeNum === 9 || gradeNum === 10) return "#FF9800"; // Orange
    return "#F44336"; // Red
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
          Select Subject & Topic
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Grade Info */}
      <View style={[styles.gradeInfo, { backgroundColor: theme.surface }]}>
        <Text style={[styles.gradeText, { color: theme.textSecondary }]}>
          📚 Grade {grade} • All Subjects
        </Text>
      </View>

      {/* Change Grade Button */}
      <TouchableOpacity
        style={[styles.changeGradeButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("GradeSelection")}
      >
        <Text style={styles.changeGradeButtonText}>📚 Change Grade</Text>
      </TouchableOpacity>

      {/* Difficulty Info */}
      <View style={[styles.difficultyCard, { backgroundColor: theme.surface }]}>
        <Text style={[styles.difficultyLabel, { color: theme.textSecondary }]}>
          Difficulty Level:
        </Text>
        <View
          style={[
            styles.difficultyBadge,
            { backgroundColor: getDifficultyColor(grade) },
          ]}
        >
          <Text style={styles.difficultyText}>{getDifficultyLabel(grade)}</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {subjects.map((subject) => {
          const isExpanded = expandedSubject === subject.id;
          const totalQuestions = subject.topics.reduce(
            (sum, topic) => sum + topic.questions,
            0
          );

          return (
            <View key={subject.id} style={styles.subjectContainer}>
              {/* Subject Header */}
              <TouchableOpacity
                style={[
                  styles.subjectCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: subject.color,
                  },
                ]}
                onPress={() => handleSubjectPress(subject.id)}
              >
                <View style={styles.subjectHeader}>
                  <View style={styles.subjectInfo}>
                    <Text style={styles.subjectIcon}>{subject.icon}</Text>
                    <View style={styles.subjectDetails}>
                      <Text style={[styles.subjectName, { color: theme.text }]}>
                        {subject.name}
                      </Text>
                      <Text
                        style={[
                          styles.subjectMeta,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {subject.topics.length} topics • {totalQuestions}{" "}
                        questions
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.expandIcon, { color: theme.text }]}>
                    {isExpanded ? "▼" : "▶"}
                  </Text>
                </View>

                {/* Start All Button (when collapsed) */}
                {!isExpanded && (
                  <TouchableOpacity
                    style={[
                      styles.startAllButton,
                      { backgroundColor: subject.color },
                    ]}
                    onPress={() => handleStartAllTopics(subject)}
                  >
                    <Text style={styles.startAllButtonText}>Start Test →</Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>

              {/* Topics List (when expanded) */}
              {isExpanded && (
                <View style={styles.topicsContainer}>
                  {subject.topics.map((topic, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.topicCard,
                        { backgroundColor: theme.background },
                      ]}
                      onPress={() => handleTopicPress(subject, topic)}
                    >
                      <View style={styles.topicInfo}>
                        <Text style={[styles.topicName, { color: theme.text }]}>
                          {topic.name}
                        </Text>
                        <Text
                          style={[
                            styles.topicQuestions,
                            { color: theme.textSecondary },
                          ]}
                        >
                          {topic.questions} questions
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.startButton,
                          { backgroundColor: subject.color },
                        ]}
                      >
                        <Text style={styles.startButtonText}>Start →</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholder: {
    width: 60,
  },
  gradeInfo: {
    padding: 15,
    alignItems: "center",
  },
  gradeText: {
    fontSize: 14,
    fontWeight: "600",
  },
  changeGradeButton: {
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  changeGradeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  subjectContainer: {
    marginBottom: 15,
  },
  subjectCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subjectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  subjectInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  subjectIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  subjectDetails: {
    flex: 1,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subjectMeta: {
    fontSize: 14,
  },
  expandIcon: {
    fontSize: 18,
    fontWeight: "bold",
  },
  startAllButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  startAllButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  topicsContainer: {
    marginTop: 10,
    gap: 10,
  },
  topicCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 8,
    marginLeft: 20,
  },
  topicInfo: {
    flex: 1,
  },
  topicName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  topicQuestions: {
    fontSize: 14,
  },
  startButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  difficultyCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  difficultyLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  difficultyBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  difficultyText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
