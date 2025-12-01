import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const API_URL = "http://192.168.1.100:5000/api";

// Create axios instance with custom config
const api = axios.create({
  baseURL: API_URL,
  timeout: 120000, // 2 minutes
  headers: {
    "Content-Type": "application/json",
  },
});

export default function GradeSelectionScreen({ route, navigation }) {
  const { theme } = useTheme();
  const { user, updateUser } = useContext(AuthContext);
  const { fromScreen } = route.params || {};
  const [selectedGrade, setSelectedGrade] = useState(
    user?.grade?.toString() || ""
  );
  const [loading, setLoading] = useState(false);

  const grades = [
    {
      value: "8",
      label: "Grade 8",
      icon: "🎒",
      description: "Foundation Phase",
    },
    { value: "9", label: "Grade 9", icon: "📚", description: "Intermediate" },
    { value: "10", label: "Grade 10", icon: "📖", description: "FET Phase" },
    { value: "11", label: "Grade 11", icon: "📝", description: "Pre-Matric" },
    { value: "12", label: "Grade 12", icon: "🎓", description: "Matric Year" },
  ];

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
  };

  const handleConfirm = async () => {
    if (!selectedGrade) {
      Alert.alert("Select Grade", "Please select your grade to continue.");
      return;
    }

    try {
      setLoading(true);

      // Update grade on backend with timeout
      const response = await api.put(
        `/users/profile`,
        { grade: parseInt(selectedGrade) },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update local user context
      await updateUser({ ...user, grade: parseInt(selectedGrade) });

      Alert.alert(
        "Success! 🎉",
        `Your grade has been updated to Grade ${selectedGrade}`,
        [
          {
            text: "OK",
            onPress: () => {
              if (fromScreen === "Home") {
                navigation.goBack();
              } else {
                navigation.navigate("Home");
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error updating grade:", error);
      Alert.alert("Error", "Failed to update grade. Please try again.", [
        {
          text: "OK",
          onPress: () => {
            // Still update locally even if API fails
            updateUser({ ...user, grade: parseInt(selectedGrade) });
            navigation.goBack();
          },
        },
      ]);
    } finally {
      setLoading(false);
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
          Select Your Grade
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Choose your current grade level
        </Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.infoBox}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={[styles.infoText, { color: theme.text }]}>
            Selecting your grade helps us provide you with appropriate study
            materials and questions tailored to your level.
          </Text>
        </View>

        <View style={styles.gradesContainer}>
          {grades.map((grade) => {
            const isSelected = selectedGrade === grade.value;

            return (
              <TouchableOpacity
                key={grade.value}
                style={[
                  styles.gradeCard,
                  {
                    backgroundColor: isSelected
                      ? theme.primary + "20"
                      : theme.surface,
                    borderColor: isSelected ? theme.primary : theme.border,
                    borderWidth: isSelected ? 3 : 1,
                  },
                ]}
                onPress={() => handleGradeSelect(grade.value)}
              >
                <View style={styles.gradeCardContent}>
                  <Text style={styles.gradeIcon}>{grade.icon}</Text>
                  <View style={styles.gradeInfo}>
                    <Text
                      style={[
                        styles.gradeLabel,
                        {
                          color: isSelected ? theme.primary : theme.text,
                          fontWeight: isSelected ? "bold" : "600",
                        },
                      ]}
                    >
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
                  </View>
                  {isSelected && (
                    <View
                      style={[
                        styles.checkmark,
                        { backgroundColor: theme.primary },
                      ]}
                    >
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Tips Section */}
        <View
          style={[
            styles.tipsBox,
            {
              backgroundColor: theme.primary + "15",
              borderColor: theme.primary,
            },
          ]}
        >
          <Text style={styles.tipsIcon}>💡</Text>
          <Text style={[styles.tipsTitle, { color: theme.primary }]}>
            Why is this important?
          </Text>
          <Text style={[styles.tipsText, { color: theme.text }]}>
            • Get questions matching your curriculum{"\n"}• Access
            grade-appropriate resources{"\n"}• Track progress at your level
            {"\n"}• Prepare for your specific exams{"\n"}• You can change this
            anytime in Settings
          </Text>
        </View>
      </ScrollView>

      {/* Confirm Button */}
      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            { backgroundColor: theme.primary },
            !selectedGrade && styles.confirmButtonDisabled,
          ]}
          onPress={handleConfirm}
          disabled={!selectedGrade || loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.confirmButtonText}>
              {selectedGrade
                ? `Confirm Grade ${selectedGrade}`
                : "Select a Grade"}
            </Text>
          )}
        </TouchableOpacity>
      </View>
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
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 15,
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    marginBottom: 25,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  gradesContainer: {
    gap: 15,
  },
  gradeCard: {
    borderRadius: 12,
    elevation: 2,
    overflow: "hidden",
  },
  gradeCardContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  gradeIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  gradeInfo: {
    flex: 1,
  },
  gradeLabel: {
    fontSize: 18,
    marginBottom: 4,
  },
  gradeDescription: {
    fontSize: 13,
  },
  checkmark: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  tipsBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginTop: 25,
  },
  tipsIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    padding: 20,
    elevation: 8,
  },
  confirmButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
