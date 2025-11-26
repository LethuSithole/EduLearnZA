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

export default function GradeSelectionScreen({ navigation }) {
  const { theme } = useTheme();
  const { updateUser } = useContext(AuthContext);
  const [selectedGrade, setSelectedGrade] = useState(null);

  const grades = [
    { id: "8", name: "Grade 8", icon: "📗", description: "Foundation year" },
    { id: "9", name: "Grade 9", icon: "📘", description: "Building blocks" },
    { id: "10", name: "Grade 10", icon: "📙", description: "FET Phase start" },
    { id: "11", name: "Grade 11", icon: "📕", description: "Pre-matric year" },
    { id: "12", name: "Grade 12", icon: "📔", description: "Matric year" },
  ];

  const handleContinue = () => {
    if (selectedGrade) {
      updateUser({ grade: selectedGrade });
      Alert.alert(
        "Grade Updated! ✅",
        `Your grade has been set to Grade ${selectedGrade}`,
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("MainTabs"),
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
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
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.icon}>🎓</Text>
        <Text style={[styles.title, { color: theme.text }]}>
          Select Your Grade
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Choose your current grade to get personalized content
        </Text>

        <View style={styles.gradesContainer}>
          {grades.map((grade) => (
            <TouchableOpacity
              key={grade.id}
              style={[
                styles.gradeCard,
                {
                  backgroundColor: theme.surface,
                  borderColor:
                    selectedGrade === grade.id ? theme.primary : theme.border,
                  borderWidth: selectedGrade === grade.id ? 3 : 1,
                },
              ]}
              onPress={() => setSelectedGrade(grade.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.gradeIcon}>{grade.icon}</Text>
              <View style={styles.gradeInfo}>
                <Text style={[styles.gradeName, { color: theme.text }]}>
                  {grade.name}
                </Text>
                <Text
                  style={[
                    styles.gradeDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  {grade.description}
                </Text>
              </View>
              {selectedGrade === grade.id && (
                <View
                  style={[styles.checkmark, { backgroundColor: theme.primary }]}
                >
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            {
              backgroundColor: selectedGrade ? theme.primary : theme.border,
              opacity: selectedGrade ? 1 : 0.5,
            },
          ]}
          onPress={handleContinue}
          disabled={!selectedGrade}
        >
          <Text style={styles.continueButtonText}>
            {selectedGrade ? "Continue" : "Select a grade"}
          </Text>
        </TouchableOpacity>
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
    alignItems: "center",
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginRight: 15,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
    alignItems: "center",
  },
  icon: {
    fontSize: 80,
    marginTop: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  gradesContainer: {
    width: "100%",
    gap: 12,
  },
  gradeCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gradeIcon: {
    fontSize: 30,
    marginRight: 15,
  },
  gradeInfo: {
    flex: 1,
  },
  gradeName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
  },
  gradeDescription: {
    fontSize: 14,
  },
  checkmark: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  continueButton: {
    width: "100%",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
