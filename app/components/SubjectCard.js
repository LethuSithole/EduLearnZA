import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SubjectCard({ subject, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: subject.color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{subject.icon}</Text>
      <Text style={styles.name}>{subject.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 12,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  icon: {
    fontSize: 48,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});
