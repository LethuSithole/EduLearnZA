import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../context/ThemeContext";

const grades = ["8", "9", "10", "11", "12"];

export default function GradePicker({ selectedGrade, onGradeChange }) {
  const themeContext = useTheme();
  const theme = themeContext?.theme || {
    surface: "#ffffff",
    text: "#000000",
    primary: "#6200EE",
  };

  return (
    <View style={styles.container}>
      {grades.map((grade) => (
        <TouchableOpacity
          key={grade}
          style={[
            styles.gradeButton,
            {
              backgroundColor:
                selectedGrade === grade ? theme.primary : theme.surface,
            },
          ]}
          onPress={() => onGradeChange(grade)}
        >
          <Text
            style={[
              styles.gradeText,
              {
                color: selectedGrade === grade ? "#ffffff" : theme.text,
              },
            ]}
          >
            {grade}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gradeButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
