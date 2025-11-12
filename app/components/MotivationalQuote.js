import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const MOTIVATIONAL_QUOTES = [
  {
    quote:
      "Education is the most powerful weapon which you can use to change the world.",
    author: "Nelson Mandela",
  },
  {
    quote:
      "The beautiful thing about learning is that no one can take it away from you.",
    author: "B.B. King",
  },
  {
    quote:
      "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
  },
  {
    quote: "The expert in anything was once a beginner.",
    author: "Helen Hayes",
  },
  {
    quote: "Study while others are sleeping; work while others are loafing.",
    author: "William Arthur Ward",
  },
  {
    quote:
      "Learning is not attained by chance, it must be sought for with ardor.",
    author: "Abigail Adams",
  },
];

const STUDY_TIPS = [
  "💡 Tip: Break your study sessions into 25-minute intervals with 5-minute breaks.",
  "💡 Tip: Study the hardest subject first when your brain is fresh.",
  "💡 Tip: Teach someone else what you've learned to reinforce your understanding.",
  "💡 Tip: Use flashcards for memorization and active recall practice.",
  "💡 Tip: Get enough sleep - your brain consolidates learning during rest.",
  "💡 Tip: Create a dedicated study space free from distractions.",
];

export default function MotivationalQuote({ type = "quote" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(1));

  const content = type === "quote" ? MOTIVATIONAL_QUOTES : STUDY_TIPS;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();

      setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (type === "tip") {
    return (
      <Animated.View style={[styles.tipContainer, { opacity: fadeAnim }]}>
        <Text style={styles.tipText}>{content[currentIndex]}</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.icon}>💭</Text>
      <Text style={styles.quote}>"{content[currentIndex].quote}"</Text>
      <Text style={styles.author}>- {content[currentIndex].author}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F3E5F5",
    borderRadius: 12,
    padding: 20,
    marginVertical: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#6200EE",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    fontSize: 24,
    marginBottom: 10,
  },
  quote: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#333",
    marginBottom: 10,
    lineHeight: 24,
  },
  author: {
    fontSize: 14,
    color: "#6200EE",
    fontWeight: "600",
    textAlign: "right",
  },
  tipContainer: {
    backgroundColor: "#FFF9E6",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
  },
  tipText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
});
