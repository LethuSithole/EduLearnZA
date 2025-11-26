import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function SignLanguageScreen({ navigation }) {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState("alphabet");

  const categories = [
    { id: "alphabet", name: "Alphabet", icon: "🔤" },
    { id: "numbers", name: "Numbers", icon: "🔢" },
    { id: "greetings", name: "Greetings", icon: "👋" },
    { id: "common", name: "Common Words", icon: "💬" },
  ];

  const signLanguageData = {
    alphabet: [
      {
        letter: "A",
        description: "Closed fist with thumb on the side",
        emoji: "✊",
      },
      {
        letter: "B",
        description: "Flat hand, fingers together, thumb across palm",
        emoji: "✋",
      },
      {
        letter: "C",
        description: "Curved hand forming a 'C' shape",
        emoji: "👌",
      },
      {
        letter: "D",
        description: "Index finger up, other fingers touch thumb",
        emoji: "☝️",
      },
      {
        letter: "E",
        description: "Fingers curled, thumb over fingernails",
        emoji: "✊",
      },
      {
        letter: "F",
        description: "OK sign - thumb and index form circle",
        emoji: "👌",
      },
      {
        letter: "G",
        description: "Index finger and thumb pointing sideways",
        emoji: "👉",
      },
      {
        letter: "H",
        description: "Index and middle finger extended sideways",
        emoji: "✌️",
      },
      { letter: "I", description: "Pinky finger extended up", emoji: "🤙" },
      {
        letter: "J",
        description: "Pinky finger draws a 'J' in the air",
        emoji: "🤙",
      },
    ],
    numbers: [
      { number: "1", description: "Index finger up", emoji: "☝️" },
      { number: "2", description: "Index and middle finger up", emoji: "✌️" },
      {
        number: "3",
        description: "Thumb, index, and middle finger up",
        emoji: "🤟",
      },
      {
        number: "4",
        description: "Four fingers up, thumb tucked",
        emoji: "🖐️",
      },
      { number: "5", description: "All five fingers spread", emoji: "🖐️" },
      { number: "6", description: "Thumb and pinky extended", emoji: "🤙" },
      {
        number: "7",
        description: "Thumb, index, middle finger up",
        emoji: "🤟",
      },
      {
        number: "8",
        description: "Thumb and all fingers except pinky",
        emoji: "🖐️",
      },
      {
        number: "9",
        description: "Index finger touching thumb, others up",
        emoji: "👌",
      },
      {
        number: "10",
        description: "Thumb up, shake side to side",
        emoji: "👍",
      },
    ],
    greetings: [
      {
        word: "Hello",
        description: "Wave hand or salute from forehead",
        emoji: "👋",
      },
      {
        word: "Goodbye",
        description: "Wave hand, palm facing outward",
        emoji: "👋",
      },
      {
        word: "Thank you",
        description: "Fingers to lips, move forward",
        emoji: "🙏",
      },
      {
        word: "Please",
        description: "Flat hand circles on chest",
        emoji: "🤲",
      },
      { word: "Sorry", description: "Fist circles on chest", emoji: "🙏" },
      { word: "Yes", description: "Fist nods up and down", emoji: "✊" },
      {
        word: "No",
        description: "Index and middle finger close on thumb",
        emoji: "🤚",
      },
    ],
    common: [
      { word: "Help", description: "Fist on flat palm, move up", emoji: "🆘" },
      { word: "Water", description: "W shape taps chin", emoji: "💧" },
      { word: "Food", description: "Fingers to mouth", emoji: "🍽️" },
      { word: "School", description: "Clap hands twice", emoji: "🏫" },
      {
        word: "Book",
        description: "Palms together, open like a book",
        emoji: "📖",
      },
      {
        word: "Friend",
        description: "Hook index fingers together",
        emoji: "🤝",
      },
      { word: "Love", description: "Cross arms over chest", emoji: "❤️" },
      {
        word: "Family",
        description: "F hands circle around each other",
        emoji: "👨‍👩‍👧‍👦",
      },
    ],
  };

  const getCurrentData = () => {
    return signLanguageData[selectedCategory] || [];
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
          🤟 Sign Language Learning
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Learn South African Sign Language
        </Text>
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryContainer}
        contentContainerStyle={styles.categoryContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              {
                backgroundColor:
                  selectedCategory === category.id
                    ? theme.primary
                    : theme.surface,
                borderColor: theme.border,
              },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryText,
                {
                  color: selectedCategory === category.id ? "#FFF" : theme.text,
                },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Sign Language Cards */}
      <ScrollView style={styles.content}>
        <View style={styles.cardsContainer}>
          {getCurrentData().map((item, index) => (
            <View
              key={index}
              style={[
                styles.signCard,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <View style={styles.signHeader}>
                <Text style={styles.signEmoji}>{item.emoji}</Text>
                <Text style={[styles.signTitle, { color: theme.text }]}>
                  {item.letter || item.number || item.word}
                </Text>
              </View>
              <Text
                style={[styles.signDescription, { color: theme.textSecondary }]}
              >
                {item.description}
              </Text>
            </View>
          ))}
        </View>

        {/* Info Section */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.infoTitle, { color: theme.text }]}>
            💡 Learning Tips
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Practice regularly - consistency is key!
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Watch your hand position carefully
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Practice in front of a mirror
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Start slow and build speed gradually
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Join sign language communities to practice
          </Text>
        </View>

        {/* Resources Section */}
        <View
          style={[
            styles.infoCard,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.infoTitle, { color: theme.text }]}>
            📚 Additional Resources
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • DeafSA - Deaf Federation of South Africa
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • SASL Dictionary (South African Sign Language)
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Local sign language classes and workshops
          </Text>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            • Online video tutorials and courses
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
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
  subtitle: {
    fontSize: 14,
  },
  categoryContainer: {
    maxHeight: 80,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  categoryContent: {
    padding: 15,
    gap: 10,
  },
  categoryTab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  cardsContainer: {
    padding: 15,
  },
  signCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  signHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  signEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  signTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  signDescription: {
    fontSize: 16,
    lineHeight: 24,
  },
  infoCard: {
    margin: 15,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 8,
  },
  spacer: {
    height: 30,
  },
});
