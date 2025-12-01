import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function PastPapersScreen({ navigation }) {
  const { theme } = useTheme();
  const [selectedGrade, setSelectedGrade] = useState("12");

  const grades = ["8", "9", "10", "11", "12"];

  const pastPapers = {
    12: [
      {
        subject: "Mathematics",
        icon: "📐",
        color: "#FF6B6B",
        papers: [
          { name: "2023 Paper 1", url: "https://education.gov.za" },
          { name: "2023 Paper 2", url: "https://education.gov.za" },
          { name: "2022 Paper 1", url: "https://education.gov.za" },
          { name: "2022 Paper 2", url: "https://education.gov.za" },
        ],
      },
      {
        subject: "Physical Sciences",
        icon: "⚗️",
        color: "#45B7D1",
        papers: [
          { name: "2023 Paper 1", url: "https://education.gov.za" },
          { name: "2023 Paper 2", url: "https://education.gov.za" },
          { name: "2022 Paper 1", url: "https://education.gov.za" },
          { name: "2022 Paper 2", url: "https://education.gov.za" },
        ],
      },
      {
        subject: "Life Sciences",
        icon: "🧬",
        color: "#96CEB4",
        papers: [
          { name: "2023 Paper 1", url: "https://education.gov.za" },
          { name: "2023 Paper 2", url: "https://education.gov.za" },
          { name: "2022 Paper 1", url: "https://education.gov.za" },
          { name: "2022 Paper 2", url: "https://education.gov.za" },
        ],
      },
      {
        subject: "English",
        icon: "📚",
        color: "#4ECDC4",
        papers: [
          { name: "2023 Paper 1", url: "https://education.gov.za" },
          { name: "2023 Paper 2", url: "https://education.gov.za" },
          { name: "2022 Paper 1", url: "https://education.gov.za" },
          { name: "2022 Paper 2", url: "https://education.gov.za" },
        ],
      },
    ],
    11: [
      {
        subject: "Mathematics",
        icon: "📐",
        color: "#FF6B6B",
        papers: [
          { name: "2023 November", url: "https://education.gov.za" },
          { name: "2023 June", url: "https://education.gov.za" },
          { name: "2022 November", url: "https://education.gov.za" },
        ],
      },
      {
        subject: "Physical Sciences",
        icon: "⚗️",
        color: "#45B7D1",
        papers: [
          { name: "2023 November", url: "https://education.gov.za" },
          { name: "2023 June", url: "https://education.gov.za" },
          { name: "2022 November", url: "https://education.gov.za" },
        ],
      },
    ],
    10: [
      {
        subject: "Mathematics",
        icon: "📐",
        color: "#FF6B6B",
        papers: [
          { name: "2023 November", url: "https://education.gov.za" },
          { name: "2023 June", url: "https://education.gov.za" },
        ],
      },
      {
        subject: "English",
        icon: "📚",
        color: "#4ECDC4",
        papers: [
          { name: "2023 November", url: "https://education.gov.za" },
          { name: "2023 June", url: "https://education.gov.za" },
        ],
      },
    ],
    9: [
      {
        subject: "Mathematics",
        icon: "📐",
        color: "#FF6B6B",
        papers: [{ name: "2023 November", url: "https://education.gov.za" }],
      },
    ],
    8: [
      {
        subject: "Mathematics",
        icon: "📐",
        color: "#FF6B6B",
        papers: [{ name: "2023 November", url: "https://education.gov.za" }],
      },
    ],
  };

  const openPaper = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open this link");
      }
    } catch (error) {
      Alert.alert(
        "Coming Soon",
        "Past papers will be available for download soon! Check the Department of Basic Education website in the meantime."
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Past Exam Papers
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Practice with previous years' papers
        </Text>
      </View>

      {/* Grade Selector */}
      <View style={styles.gradeSelector}>
        <Text style={[styles.gradeSelectorLabel, { color: theme.text }]}>
          Select Grade:
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.gradeButtons}>
            {grades.map((grade) => (
              <TouchableOpacity
                key={grade}
                style={[
                  styles.gradeButton,
                  {
                    backgroundColor:
                      selectedGrade === grade ? theme.primary : theme.surface,
                    borderColor:
                      selectedGrade === grade ? theme.primary : theme.border,
                  },
                ]}
                onPress={() => setSelectedGrade(grade)}
              >
                <Text
                  style={[
                    styles.gradeButtonText,
                    {
                      color: selectedGrade === grade ? "#FFF" : theme.text,
                    },
                  ]}
                >
                  Grade {grade}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        {pastPapers[selectedGrade]?.map((subject, index) => (
          <View key={index} style={styles.subjectSection}>
            <View style={styles.subjectHeader}>
              <Text style={styles.subjectIcon}>{subject.icon}</Text>
              <Text style={[styles.subjectTitle, { color: theme.text }]}>
                {subject.subject}
              </Text>
            </View>

            <View
              style={[
                styles.papersContainer,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              {subject.papers.map((paper, paperIndex) => (
                <TouchableOpacity
                  key={paperIndex}
                  style={[
                    styles.paperItem,
                    paperIndex < subject.papers.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border,
                    },
                  ]}
                  onPress={() => openPaper(paper.url)}
                >
                  <View style={styles.paperInfo}>
                    <Text style={[styles.paperName, { color: theme.text }]}>
                      📄 {paper.name}
                    </Text>
                  </View>
                  <Text style={[styles.downloadIcon, { color: subject.color }]}>
                    ⬇️
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Info Box */}
        <View
          style={[
            styles.infoBox,
            {
              backgroundColor: theme.primary + "15",
              borderColor: theme.primary,
            },
          ]}
        >
          <Text style={styles.infoIcon}>💡</Text>
          <Text style={[styles.infoTitle, { color: theme.primary }]}>
            Study Tips
          </Text>
          <Text style={[styles.infoText, { color: theme.text }]}>
            • Practice past papers under exam conditions{"\n"}• Time yourself to
            improve speed{"\n"}• Review marking memos after completing{"\n"}•
            Identify weak areas and revise them{"\n"}• Start with recent papers
            first
          </Text>
        </View>

        <View style={styles.spacer} />
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
  },
  backButton: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  gradeSelector: {
    padding: 20,
    paddingBottom: 10,
  },
  gradeSelectorLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  gradeButtons: {
    flexDirection: "row",
    gap: 10,
  },
  gradeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 2,
  },
  gradeButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 10,
  },
  subjectSection: {
    marginBottom: 25,
  },
  subjectHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  subjectIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  papersContainer: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    elevation: 2,
  },
  paperItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  paperInfo: {
    flex: 1,
  },
  paperName: {
    fontSize: 15,
    fontWeight: "500",
  },
  downloadIcon: {
    fontSize: 20,
  },
  infoBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 10,
  },
  infoIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
  spacer: {
    height: 30,
  },
});
