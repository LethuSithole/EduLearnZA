import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

export default function GradeSelectionScreen({ navigation, route }) {
  const { user } = useContext(AuthContext);
  const { theme } = useTheme();
  const { fromScreen } = route.params || {};

  const [selectedGrade, setSelectedGrade] = useState(user?.grade || "12");

  const grades = [
    {
      value: "8",
      label: "Grade 8",
      description: "Junior Phase - Building Foundations",
      color: "#FF6B6B",
      details: "Core subjects introduction",
      difficulty: "⭐ Easy",
      difficultyColor: "#4CAF50",
    },
    {
      value: "9",
      label: "Grade 9",
      description: "Senior Phase - Developing Skills",
      color: "#4ECDC4",
      details: "Preparing for FET phase",
      difficulty: "⭐⭐ Medium",
      difficultyColor: "#FF9800",
    },
    {
      value: "10",
      label: "Grade 10",
      description: "FET Phase - Foundation Year",
      color: "#95E1D3",
      details: "Start of Further Education",
      difficulty: "⭐⭐ Medium",
      difficultyColor: "#FF9800",
    },
    {
      value: "11",
      label: "Grade 11",
      description: "FET Phase - Building Expertise",
      color: "#FFE66D",
      details: "Pre-Matric preparation",
      difficulty: "⭐⭐⭐ Hard",
      difficultyColor: "#F44336",
    },
    {
      value: "12",
      label: "Grade 12",
      description: "Matric Level - Final Year",
      color: "#845EC2",
      details: "National Senior Certificate",
      difficulty: "⭐⭐⭐ Hard",
      difficultyColor: "#F44336",
    },
  ];

  const handleContinue = () => {
    if (!selectedGrade) {
      Alert.alert("Please Select", "Please select a grade to continue");
      return;
    }

    // Navigate to AllSubjectsTest with selected grade
    navigation.navigate("AllSubjectsTest", {
      grade: selectedGrade,
    });
  };

  const handleSkip = () => {
    // Use user's current grade
    navigation.navigate("AllSubjectsTest", {
      grade: user?.grade || "12",
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
          Select Grade
        </Text>
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipButtonText, { color: theme.primary }]}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.infoSection}>
            <Text style={[styles.title, { color: theme.text }]}>
              Choose Your Grade Level 📚
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Select the grade you want to practice for. You can change this
              anytime.
            </Text>
          </View>

          {/* Current Grade Display */}
          <View
            style={[
              styles.currentGradeCard,
              { backgroundColor: theme.surface },
            ]}
          >
            <Text
              style={[styles.currentGradeLabel, { color: theme.textSecondary }]}
            >
              Your Current Grade:
            </Text>
            <Text style={[styles.currentGrade, { color: theme.primary }]}>
              Grade {user?.grade || "12"}
            </Text>
          </View>

          {/* Grade Options */}
          <View style={styles.gradesContainer}>
            {grades.map((grade) => {
              const isSelected = selectedGrade === grade.value;
              return (
                <TouchableOpacity
                  key={grade.value}
                  style={[
                    styles.gradeCard,
                    {
                      backgroundColor: theme.surface,
                      borderColor: isSelected ? grade.color : theme.surface,
                      borderWidth: 3,
                    },
                  ]}
                  onPress={() => setSelectedGrade(grade.value)}
                  activeOpacity={0.7}
                >
                  <View style={styles.gradeCardContent}>
                    <View style={styles.gradeInfo}>
                      <Text style={[styles.gradeLabel, { color: theme.text }]}>
                        {grade.label}
                      </Text>
                      <Text
                        style={[
                          styles.gradeDescription,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {grade.description}
                      </Text>
                      <Text
                        style={[
                          styles.gradeDetails,
                          { color: theme.textSecondary },
                        ]}
                      >
                        {grade.details}
                      </Text>
                      <View
                        style={[
                          styles.difficultyTag,
                          { backgroundColor: grade.difficultyColor },
                        ]}
                      >
                        <Text style={styles.difficultyTagText}>
                          {grade.difficulty}
                        </Text>
                      </View>
                    </View>

                    {isSelected && (
                      <View
                        style={[
                          styles.checkmark,
                          { backgroundColor: grade.color },
                        ]}
                      >
                        <Text style={styles.checkmarkText}>✓</Text>
                      </View>
                    )}
                  </View>

                  {/* Visual Indicator */}
                  <View
                    style={[
                      styles.gradeIndicator,
                      {
                        backgroundColor: isSelected
                          ? grade.color
                          : theme.background,
                      },
                    ]}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Info Box */}
          <View style={[styles.infoBox, { backgroundColor: "#FFF3CD" }]}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              Selecting a different grade will show questions appropriate for
              that level. This helps you prepare for exams or review previous
              material.
            </Text>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            style={[
              styles.continueButton,
              {
                backgroundColor: selectedGrade ? theme.primary : theme.surface,
              },
            ]}
            onPress={handleContinue}
            disabled={!selectedGrade}
          >
            <Text
              style={[
                styles.continueButtonText,
                { color: selectedGrade ? "#fff" : theme.textSecondary },
              ]}
            >
              Continue to Test →
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
  skipButton: {
    padding: 5,
  },
  skipButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  infoSection: {
    marginBottom: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  currentGradeCard: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  currentGradeLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  currentGrade: {
    fontSize: 24,
    fontWeight: "bold",
  },
  gradesContainer: {
    gap: 15,
    marginBottom: 20,
  },
  gradeCard: {
    borderRadius: 16,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradeCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  gradeInfo: {
    flex: 1,
  },
  gradeLabel: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  gradeDescription: {
    fontSize: 15,
    marginBottom: 3,
  },
  gradeDetails: {
    fontSize: 13,
    fontStyle: "italic",
  },
  difficultyTag: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginTop: 8,
  },
  difficultyTagText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  checkmark: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  gradeIndicator: {
    height: 6,
  },
  infoBox: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#856404",
  },
  continueButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
