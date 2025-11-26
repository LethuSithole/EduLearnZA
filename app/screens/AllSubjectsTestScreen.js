import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../context/AuthContext";

export default function AllSubjectsTestScreen({ navigation, route }) {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const { grade: selectedGrade } = route.params || {};
  const grade = selectedGrade || user?.grade || "12";

  const [loading, setLoading] = useState(false);
  const [fetchingSubject, setFetchingSubject] = useState(null);

  const getQuestionCountByGrade = (baseCount, gradeLevel) => {
    const gradeNum = parseInt(gradeLevel);
    if (gradeNum <= 8) return Math.floor(baseCount * 0.7);
    if (gradeNum === 9) return Math.floor(baseCount * 0.8);
    if (gradeNum === 10) return Math.floor(baseCount * 0.9);
    return baseCount;
  };

  const subjects = [
    {
      id: "1",
      name: "Mathematics",
      icon: "🔢",
      color: "#FF6B6B",
      topics: [
        {
          name: "Algebra",
          category: "19",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "Geometry",
          category: "19",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "Calculus",
          category: "19",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "Statistics",
          category: "19",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "Trigonometry",
          category: "19",
          questions: getQuestionCountByGrade(50, grade),
        },
      ],
    },
    {
      id: "2",
      name: "Science",
      icon: "🔬",
      color: "#4ECDC4",
      topics: [
        {
          name: "Chemistry",
          category: "17",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "Physics",
          category: "17",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "Biology",
          category: "17",
          questions: getQuestionCountByGrade(50, grade),
        },
      ],
    },
    {
      id: "3",
      name: "English",
      icon: "📚",
      color: "#95E1D3",
      topics: [
        {
          name: "Grammar",
          category: "9",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "Literature",
          category: "10",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "Vocabulary",
          category: "9",
          questions: getQuestionCountByGrade(50, grade),
        },
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
          category: "23",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "South African History",
          category: "23",
          questions: getQuestionCountByGrade(50, grade),
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
          category: "22",
          questions: getQuestionCountByGrade(50, grade),
        },
        {
          name: "South African Geography",
          category: "22",
          questions: getQuestionCountByGrade(50, grade),
        },
      ],
    },
  ];

  const getDifficulty = (gradeLevel) => {
    const gradeNum = parseInt(gradeLevel);
    if (gradeNum <= 8) return "easy";
    if (gradeNum === 9 || gradeNum === 10) return "medium";
    return "hard";
  };

  const getDifficultyLabel = (gradeLevel) => {
    const gradeNum = parseInt(gradeLevel);
    if (gradeNum <= 8) return "⭐ Easy";
    if (gradeNum === 9 || gradeNum === 10) return "⭐⭐ Medium";
    return "⭐⭐⭐ Hard";
  };

  const getDifficultyColor = (gradeLevel) => {
    const gradeNum = parseInt(gradeLevel);
    if (gradeNum <= 8) return "#4CAF50";
    if (gradeNum === 9 || gradeNum === 10) return "#FF9800";
    return "#F44336";
  };

  const decodeHTML = (html) => {
    const txt = html
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&nbsp;/g, " ");
    return txt;
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const fetchAllQuestionsForSubject = async (subject) => {
    setFetchingSubject(subject.name);
    setLoading(true);

    try {
      let allQuestions = [];
      const difficulty = getDifficulty(grade);

      // Fetch questions from all topics
      for (const topic of subject.topics) {
        try {
          const response = await fetch(
            `https://opentdb.com/api.php?amount=10&category=${topic.category}&difficulty=${difficulty}&type=multiple`
          );

          if (!response.ok) {
            console.warn(`Failed to fetch ${topic.name} questions`);
            continue;
          }

          const data = await response.json();

          if (data.response_code === 0 && data.results.length > 0) {
            const formattedQuestions = data.results.map((q, index) => ({
              id: `${topic.name}-${index}`,
              question: decodeHTML(q.question),
              options: shuffleArray([
                ...q.incorrect_answers.map(decodeHTML),
                decodeHTML(q.correct_answer),
              ]),
              correctAnswer: decodeHTML(q.correct_answer),
              difficulty: q.difficulty,
              category: q.category,
              topic: topic.name,
              subject: subject.name,
            }));

            allQuestions = [...allQuestions, ...formattedQuestions];
          }
        } catch (error) {
          console.error(`Error fetching ${topic.name}:`, error);
        }
      }

      if (allQuestions.length === 0) {
        Alert.alert(
          "No Questions Available",
          `Could not load questions for ${subject.name}. Please try again.`
        );
        return;
      }

      // Shuffle all questions together
      const shuffledQuestions = shuffleArray(allQuestions);

      // Navigate to test with all questions
      navigation.navigate("TopicQuestions", {
        subject: {
          ...subject,
          name: `${subject.name} - All Topics`,
        },
        topic: { name: "All Topics" },
        questions: shuffledQuestions,
        totalQuestions: shuffledQuestions.length,
        grade,
      });
    } catch (error) {
      console.error("Error fetching all questions:", error);
      Alert.alert(
        "Error",
        "Failed to load questions. Please check your internet connection."
      );
    } finally {
      setLoading(false);
      setFetchingSubject(null);
    }
  };

  const handleSubjectPress = (subject) => {
    Alert.alert(
      subject.name,
      `This will load ALL questions from all ${subject.topics.length} topics. Ready to start?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Start Test",
          onPress: () => fetchAllQuestionsForSubject(subject),
        },
      ]
    );
  };

  const handleTopicPress = (subject, topic) => {
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
          All Subjects Test
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Grade Info */}
      <View style={[styles.gradeInfo, { backgroundColor: theme.surface }]}>
        <Text style={[styles.gradeLabel, { color: theme.textSecondary }]}>
          Selected Grade:
        </Text>
        <Text style={[styles.gradeValue, { color: theme.primary }]}>
          Grade {grade}
        </Text>
      </View>

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

      {/* Change Grade Button */}
      <TouchableOpacity
        style={[styles.changeGradeButton, { backgroundColor: theme.primary }]}
        onPress={() => navigation.navigate("GradeSelection")}
      >
        <Text style={styles.changeGradeButtonText}>📚 Change Grade</Text>
      </TouchableOpacity>

      {/* Info Banner */}
      <View style={[styles.infoBanner, { backgroundColor: "#E3F2FD" }]}>
        <Text style={styles.infoIcon}>💡</Text>
        <Text style={styles.infoText}>
          Tap on a subject to start a test with ALL topics, or tap a specific
          topic below each subject for focused practice.
        </Text>
      </View>

      {/* Loading Overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <View
            style={[styles.loadingCard, { backgroundColor: theme.surface }]}
          >
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.text }]}>
              Loading {fetchingSubject} questions...
            </Text>
            <Text
              style={[styles.loadingSubtext, { color: theme.textSecondary }]}
            >
              Fetching from all topics
            </Text>
          </View>
        </View>
      )}

      {/* Subjects List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {subjects.map((subject) => (
          <View key={subject.id} style={styles.subjectSection}>
            <TouchableOpacity
              style={[
                styles.subjectCard,
                {
                  backgroundColor: theme.surface,
                  borderLeftColor: subject.color,
                },
              ]}
              onPress={() => handleSubjectPress(subject)}
              disabled={loading}
              activeOpacity={0.7}
            >
              <View style={styles.subjectHeader}>
                <Text style={styles.subjectIcon}>{subject.icon}</Text>
                <View style={styles.subjectInfo}>
                  <Text style={[styles.subjectName, { color: theme.text }]}>
                    {subject.name}
                  </Text>
                  <Text
                    style={[
                      styles.subjectDescription,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {subject.topics.length} topics • Tap to start full test
                  </Text>
                </View>
                <Text style={[styles.arrowIcon, { color: subject.color }]}>
                  →
                </Text>
              </View>
            </TouchableOpacity>

            {/* Topics Grid */}
            <View style={styles.topicsGrid}>
              {subject.topics.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.topicChip,
                    {
                      backgroundColor: theme.background,
                      borderColor: subject.color + "40",
                    },
                  ]}
                  onPress={() => handleTopicPress(subject, topic)}
                  disabled={loading}
                >
                  <Text style={[styles.topicName, { color: theme.text }]}>
                    {topic.name}{" "}
                    {/* This shows actual topic name like "Algebra", "Chemistry" */}
                  </Text>
                  <Text
                    style={[
                      styles.topicQuestions,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {topic.questions} questions
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
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
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 50,
  },
  gradeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    margin: 20,
    marginBottom: 10,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  gradeLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  gradeValue: {
    fontSize: 18,
    fontWeight: "bold",
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
  infoBanner: {
    flexDirection: "row",
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: "#1565C0",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  loadingCard: {
    padding: 30,
    borderRadius: 16,
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  loadingSubtext: {
    fontSize: 14,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  subjectSection: {
    marginBottom: 20,
  },
  subjectCard: {
    margin: 20,
    marginBottom: 15,
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 6,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subjectHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  subjectIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  subjectInfo: {
    flex: 1,
  },
  subjectName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subjectDescription: {
    fontSize: 13,
  },
  arrowIcon: {
    fontSize: 24,
    fontWeight: "bold",
  },
  topicsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    gap: 10,
  },
  topicChip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 5,
  },
  topicName: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 3,
  },
  topicQuestions: {
    fontSize: 11,
  },
});
