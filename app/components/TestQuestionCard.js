import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function TestQuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && styles.selectedOption,
            ]}
            onPress={() => onSelectAnswer(option)}
          >
            <View style={styles.optionContent}>
              <View
                style={[
                  styles.radioButton,
                  selectedAnswer === option && styles.radioButtonSelected,
                ]}
              >
                {selectedAnswer === option && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
              <Text
                style={[
                  styles.optionText,
                  selectedAnswer === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {question.difficulty && (
        <View style={styles.difficultyContainer}>
          <Text style={styles.difficultyLabel}>Difficulty: </Text>
          <Text
            style={[
              styles.difficultyValue,
              {
                color:
                  question.difficulty === "Easy"
                    ? "#4CAF50"
                    : question.difficulty === "Medium"
                    ? "#FF9800"
                    : "#F44336",
              },
            ]}
          >
            {question.difficulty}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 12,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 15,
    backgroundColor: "#f9f9f9",
  },
  selectedOption: {
    borderColor: "#6200EE",
    backgroundColor: "#F3E5F5",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#999",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioButtonSelected: {
    borderColor: "#6200EE",
  },
  radioButtonInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#6200EE",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  selectedOptionText: {
    fontWeight: "600",
    color: "#6200EE",
  },
  difficultyContainer: {
    flexDirection: "row",
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  difficultyLabel: {
    fontSize: 14,
    color: "#666",
  },
  difficultyValue: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
