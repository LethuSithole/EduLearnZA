import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function LearnMoreScreen({ navigation, route }) {
  const { subject, grade: initialGrade } = route.params || {};
  const { theme } = useTheme();
  const [selectedGrade, setSelectedGrade] = useState(initialGrade || "12");
  const [activeTab, setActiveTab] = useState("guide");

  const grades = ["10", "11", "12"];

  const handleGradeChange = (grade) => {
    setSelectedGrade(grade);
  };

  const tabs = [
    { id: "guide", label: "Exam Guide", icon: "📖" },
    { id: "tips", label: "Study Tips", icon: "💡" },
    { id: "papers", label: "Past Papers", icon: "📄" },
    { id: "resources", label: "Resources", icon: "🎯" },
    { id: "techniques", label: "Techniques", icon: "🧠" },
  ];

  const pastPapers = {
    10: [
      { year: "2023", term: "November", url: "#" },
      { year: "2023", term: "June", url: "#" },
      { year: "2022", term: "November", url: "#" },
    ],
    11: [
      { year: "2023", term: "November", url: "#" },
      { year: "2023", term: "June", url: "#" },
      { year: "2022", term: "November", url: "#" },
    ],
    12: [
      { year: "2023", term: "November", url: "#" },
      { year: "2023", term: "June", url: "#" },
      { year: "2022", term: "November", url: "#" },
      { year: "2022", term: "June", url: "#" },
    ],
  };

  const handleDownloadPaper = (paper) => {
    // In a real app, this would download the paper
    console.log(`Downloading ${paper.year} ${paper.term} paper`);
    // Linking.openURL(paper.url);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "guide":
        return (
          <View style={styles.content}>
            <Text style={[styles.contentTitle, { color: theme.text }]}>
              {subject?.name || "Subject"} Exam Guide - Grade {selectedGrade}
            </Text>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                📋 Exam Format
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Duration: 3 hours{"\n"}• Total Marks: 150{"\n"}• Paper 1:
                Algebra & Functions (100 marks){"\n"}• Paper 2: Calculus &
                Statistics (50 marks){"\n"}• Calculator allowed in Paper 2 only
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                📚 Topics Breakdown
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Algebra (30%): Equations, Functions, Sequences{"\n"}• Geometry
                (25%): Euclidean, Analytical, Trigonometry{"\n"}• Calculus
                (25%): Differentiation, Integration{"\n"}• Statistics (20%):
                Probability, Data Handling
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                ⭐ Key Requirements
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Scientific calculator (non-programmable){"\n"}• Mathematical
                instruments (compass, protractor){"\n"}• Graph paper for certain
                questions{"\n"}• Formula sheet provided in exam{"\n"}• Show all
                working for full marks
              </Text>
            </View>
          </View>
        );

      case "tips":
        return (
          <View style={styles.content}>
            <Text style={[styles.contentTitle, { color: theme.text }]}>
              Study Tips & Best Practices
            </Text>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                🎯 Effective Study Habits
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Create a study schedule and stick to it{"\n"}• Break study
                sessions into 45-minute blocks{"\n"}• Take 10-15 minute breaks
                between sessions{"\n"}• Practice past papers under exam
                conditions{"\n"}• Form study groups with classmates{"\n"}• Teach
                concepts to others to reinforce learning
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                📝 Note-Taking Strategies
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Use mind maps for complex topics{"\n"}• Color-code different
                concepts{"\n"}• Create formula sheets for quick reference{"\n"}•
                Write summary notes after each chapter{"\n"}• Use flashcards for
                key definitions{"\n"}• Review notes within 24 hours of lessons
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                💪 Exam Day Tips
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Get 8 hours of sleep before exam{"\n"}• Eat a healthy
                breakfast{"\n"}• Arrive 30 minutes early{"\n"}• Read all
                instructions carefully{"\n"}• Answer easy questions first{"\n"}•
                Check your work if time permits
              </Text>
            </View>
          </View>
        );

      case "papers":
        return (
          <View style={styles.content}>
            <Text style={[styles.contentTitle, { color: theme.text }]}>
              Past Papers - Grade {selectedGrade}
            </Text>

            {pastPapers[selectedGrade]?.map((paper, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.paperCard, { backgroundColor: theme.surface }]}
                onPress={() => handleDownloadPaper(paper)}
              >
                <View style={styles.paperInfo}>
                  <Text style={[styles.paperTitle, { color: theme.text }]}>
                    {paper.year} {paper.term} Exam
                  </Text>
                  <Text
                    style={[
                      styles.paperSubtitle,
                      { color: theme.textSecondary },
                    ]}
                  >
                    Grade {selectedGrade} • {subject?.name || "Subject"}
                  </Text>
                </View>
                <View
                  style={[
                    styles.downloadButton,
                    { backgroundColor: theme.primary },
                  ]}
                >
                  <Text style={styles.downloadButtonText}>📥 Download</Text>
                </View>
              </TouchableOpacity>
            ))}

            <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
              <Text style={[styles.infoText, { color: theme.textSecondary }]}>
                💡 Tip: Practice papers under exam conditions. Time yourself and
                try to complete without notes first.
              </Text>
            </View>
          </View>
        );

      case "resources":
        return (
          <View style={styles.content}>
            <Text style={[styles.contentTitle, { color: theme.text }]}>
              Additional Resources
            </Text>

            <TouchableOpacity
              style={[styles.resourceCard, { backgroundColor: theme.surface }]}
            >
              <Text style={styles.resourceIcon}>📺</Text>
              <View style={styles.resourceInfo}>
                <Text style={[styles.resourceTitle, { color: theme.text }]}>
                  Video Tutorials
                </Text>
                <Text
                  style={[
                    styles.resourceDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Step-by-step explanations of complex topics
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resourceCard, { backgroundColor: theme.surface }]}
            >
              <Text style={styles.resourceIcon}>📱</Text>
              <View style={styles.resourceInfo}>
                <Text style={[styles.resourceTitle, { color: theme.text }]}>
                  Mobile Apps
                </Text>
                <Text
                  style={[
                    styles.resourceDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Interactive practice and quizzes on-the-go
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resourceCard, { backgroundColor: theme.surface }]}
            >
              <Text style={styles.resourceIcon}>👥</Text>
              <View style={styles.resourceInfo}>
                <Text style={[styles.resourceTitle, { color: theme.text }]}>
                  Study Groups
                </Text>
                <Text
                  style={[
                    styles.resourceDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Connect with peers for collaborative learning
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resourceCard, { backgroundColor: theme.surface }]}
            >
              <Text style={styles.resourceIcon}>📖</Text>
              <View style={styles.resourceInfo}>
                <Text style={[styles.resourceTitle, { color: theme.text }]}>
                  Textbooks & Guides
                </Text>
                <Text
                  style={[
                    styles.resourceDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Recommended reading materials and study guides
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );

      case "techniques":
        return (
          <View style={styles.content}>
            <Text style={[styles.contentTitle, { color: theme.text }]}>
              Learning Techniques
            </Text>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                🎨 Visual Learning
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Create diagrams and flowcharts{"\n"}• Use color coding for
                different concepts{"\n"}• Watch educational videos{"\n"}• Draw
                mind maps to connect ideas{"\n"}• Use graphs to visualize data
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                🎧 Auditory Learning
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Record yourself reading notes{"\n"}• Listen to educational
                podcasts{"\n"}• Discuss topics with study partners{"\n"}•
                Explain concepts out loud{"\n"}• Use mnemonic devices and songs
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                ✍️ Kinesthetic Learning
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Write notes by hand{"\n"}• Use physical flashcards{"\n"}•
                Practice problems repeatedly{"\n"}• Create physical models{"\n"}
                • Take study breaks to move around
              </Text>
            </View>

            <View style={[styles.section, { backgroundColor: theme.surface }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                🧩 Active Recall
              </Text>
              <Text
                style={[styles.sectionText, { color: theme.textSecondary }]}
              >
                • Test yourself without notes{"\n"}• Use spaced repetition{"\n"}
                • Create practice questions{"\n"}• Quiz yourself regularly{"\n"}
                • Explain concepts without references
              </Text>
            </View>
          </View>
        );

      default:
        return null;
    }
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
          {subject?.name || "Learning Resources"}
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Grade Selector */}
      <View style={[styles.gradeSelector, { backgroundColor: theme.surface }]}>
        <Text style={[styles.gradeSelectorLabel, { color: theme.text }]}>
          Select Grade:
        </Text>
        <View style={styles.gradeButtons}>
          {grades.map((grade) => (
            <TouchableOpacity
              key={grade}
              style={[
                styles.gradeButton,
                {
                  backgroundColor:
                    selectedGrade === grade ? theme.primary : theme.background,
                },
              ]}
              onPress={() => handleGradeChange(grade)}
            >
              <Text
                style={[
                  styles.gradeButtonText,
                  {
                    color:
                      selectedGrade === grade ? "#fff" : theme.textSecondary,
                  },
                ]}
              >
                Grade {grade}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.tabsContainer, { backgroundColor: theme.surface }]}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeTab === tab.id ? theme.primary : "transparent",
              },
            ]}
            onPress={() => setActiveTab(tab.id)}
          >
            <Text style={styles.tabIcon}>{tab.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                { color: activeTab === tab.id ? "#fff" : theme.text },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.scrollView}>{renderContent()}</ScrollView>
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
  gradeSelector: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gradeSelectorLabel: {
    fontSize: 16,
    fontWeight: "600",
  },
  gradeButtons: {
    flexDirection: "row",
    gap: 10,
  },
  gradeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  gradeButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabsContainer: {
    maxHeight: 70,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  tabIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  contentTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 24,
  },
  paperCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  paperInfo: {
    flex: 1,
  },
  paperTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  paperSubtitle: {
    fontSize: 14,
  },
  downloadButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  infoCard: {
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  resourceIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  resourceDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
});
