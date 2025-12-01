import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function FlashcardsScreen({ navigation }) {
  const { theme } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipAnimation] = useState(new Animated.Value(0));

  const subjects = [
    { id: 1, name: "Mathematics", icon: "📐", color: "#FF6B6B" },
    { id: 2, name: "Science", icon: "🔬", color: "#4ECDC4" },
    { id: 3, name: "English", icon: "📚", color: "#95E1D3" },
    { id: 4, name: "History", icon: "📜", color: "#FFE66D" },
    { id: 5, name: "Geography", icon: "🌍", color: "#98D8C8" },
  ];

  const flashcardsData = {
    Mathematics: [
      {
        front: "Pythagorean Theorem",
        back: "a² + b² = c²\n\nIn a right triangle, the square of the hypotenuse equals the sum of squares of the other two sides.",
      },
      {
        front: "Quadratic Formula",
        back: "x = (-b ± √(b²-4ac)) / 2a\n\nUsed to solve equations of form ax² + bx + c = 0",
      },
      {
        front: "Area of Circle",
        back: "A = πr²\n\nWhere r is the radius of the circle\nπ ≈ 3.14159",
      },
      {
        front: "Volume of Sphere",
        back: "V = (4/3)πr³\n\nWhere r is the radius of the sphere",
      },
      {
        front: "SOH CAH TOA",
        back: "sin θ = Opposite/Hypotenuse\ncos θ = Adjacent/Hypotenuse\ntan θ = Opposite/Adjacent",
      },
    ],
    Science: [
      {
        front: "Newton's First Law",
        back: "Law of Inertia\n\nAn object at rest stays at rest, and an object in motion stays in motion unless acted upon by an external force.",
      },
      {
        front: "Photosynthesis Equation",
        back: "6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂\n\nCarbon dioxide + Water + Light → Glucose + Oxygen",
      },
      {
        front: "Periodic Table Groups",
        back: "Group 1: Alkali Metals\nGroup 2: Alkaline Earth Metals\nGroup 17: Halogens\nGroup 18: Noble Gases",
      },
      {
        front: "Speed Formula",
        back: "Speed = Distance/Time\n\nv = d/t\n\nMeasured in m/s or km/h",
      },
      {
        front: "States of Matter",
        back: "Solid: Fixed shape & volume\nLiquid: Fixed volume, no fixed shape\nGas: No fixed shape or volume",
      },
    ],
    English: [
      {
        front: "Simile",
        back: "A comparison using 'like' or 'as'\n\nExample: She was as brave as a lion.",
      },
      {
        front: "Metaphor",
        back: "A direct comparison without using 'like' or 'as'\n\nExample: Time is money.",
      },
      {
        front: "Personification",
        back: "Giving human qualities to non-human things\n\nExample: The wind whispered through the trees.",
      },
      {
        front: "Alliteration",
        back: "Repetition of initial consonant sounds\n\nExample: Peter Piper picked a peck of pickled peppers.",
      },
      {
        front: "Onomatopoeia",
        back: "Words that imitate sounds\n\nExample: buzz, hiss, crash, boom",
      },
    ],
    History: [
      {
        front: "Apartheid",
        back: "System of racial segregation in South Africa (1948-1994)\n\nEnforced separation based on race",
      },
      {
        front: "Nelson Mandela",
        back: "Anti-apartheid activist\nFirst black president of SA (1994-1999)\nNobel Peace Prize winner",
      },
      {
        front: "World War I",
        back: "1914-1918\n\nTriggered by assassination of Archduke Franz Ferdinand",
      },
      {
        front: "Industrial Revolution",
        back: "Period of major industrialization (1760-1840)\n\nShift from hand production to machines",
      },
      {
        front: "Democracy",
        back: "Government by the people\n\nCitizens exercise power through voting",
      },
    ],
    Geography: [
      {
        front: "Latitude & Longitude",
        back: "Latitude: Horizontal lines (Equator = 0°)\nLongitude: Vertical lines (Prime Meridian = 0°)",
      },
      {
        front: "Climate Zones",
        back: "Tropical: Hot all year\nTemperate: 4 distinct seasons\nPolar: Cold all year",
      },
      {
        front: "Map Scale",
        back: "Ratio of distance on map to actual distance\n\nExample: 1:50,000 means 1cm = 500m",
      },
      {
        front: "Erosion",
        back: "Wearing away of Earth's surface by wind, water, or ice\n\nCreates landforms over time",
      },
      {
        front: "Renewable Resources",
        back: "Resources that can be replenished\n\nExamples: Solar, wind, hydro, biomass",
      },
    ],
  };

  const handleFlip = () => {
    Animated.timing(flipAnimation, {
      toValue: isFlipped ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    const cards = flashcardsData[selectedSubject.name] || [];
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
      flipAnimation.setValue(0);
    } else {
      Alert.alert(
        "Completed! 🎉",
        "You've reviewed all flashcards in this set.",
        [
          { text: "Review Again", onPress: () => setCurrentCardIndex(0) },
          {
            text: "Choose Another Subject",
            onPress: () => setSelectedSubject(null),
          },
        ]
      );
    }
  };

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
      flipAnimation.setValue(0);
    }
  };

  const frontInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  if (!selectedSubject) {
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
            Flashcards
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Select a subject to start studying
          </Text>
        </View>

        <ScrollView style={styles.content}>
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
            <Text style={[styles.infoText, { color: theme.text }]}>
              Flashcards help you memorize key concepts. Tap to flip and reveal
              the answer!
            </Text>
          </View>

          <View style={styles.subjectsGrid}>
            {subjects.map((subject) => (
              <TouchableOpacity
                key={subject.id}
                style={[
                  styles.subjectCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => {
                  setSelectedSubject(subject);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                  flipAnimation.setValue(0);
                }}
              >
                <View
                  style={[
                    styles.subjectIconContainer,
                    { backgroundColor: subject.color + "20" },
                  ]}
                >
                  <Text style={styles.subjectIcon}>{subject.icon}</Text>
                </View>
                <Text style={[styles.subjectName, { color: theme.text }]}>
                  {subject.name}
                </Text>
                <Text
                  style={[styles.cardCount, { color: theme.textSecondary }]}
                >
                  {flashcardsData[subject.name]?.length || 0} cards
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const currentCards = flashcardsData[selectedSubject.name] || [];
  const currentCard = currentCards[currentCardIndex];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: selectedSubject.color || theme.primary },
        ]}
      >
        <TouchableOpacity onPress={() => setSelectedSubject(null)}>
          <Text style={styles.backButtonWhite}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.subjectIconLarge}>{selectedSubject.icon}</Text>
          <Text style={styles.headerTitleWhite}>{selectedSubject.name}</Text>
        </View>
        <Text style={styles.progressText}>
          Card {currentCardIndex + 1} of {currentCards.length}
        </Text>
      </View>

      <View style={styles.flashcardContainer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleFlip}
          style={styles.cardTouchable}
        >
          <Animated.View
            style={[
              styles.flashcard,
              {
                backgroundColor: theme.surface,
                borderColor: selectedSubject.color,
                transform: [{ rotateY: frontInterpolate }],
              },
              !isFlipped && styles.flashcardVisible,
            ]}
          >
            <Text style={[styles.cardLabel, { color: theme.textSecondary }]}>
              QUESTION
            </Text>
            <Text style={[styles.cardText, { color: theme.text }]}>
              {currentCard?.front}
            </Text>
            <Text style={[styles.tapHint, { color: theme.textSecondary }]}>
              Tap to reveal answer
            </Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.flashcard,
              styles.flashcardBack,
              {
                backgroundColor: selectedSubject.color,
                borderColor: selectedSubject.color,
                transform: [{ rotateY: backInterpolate }],
              },
              isFlipped && styles.flashcardVisible,
            ]}
          >
            <Text style={styles.cardLabelWhite}>ANSWER</Text>
            <Text style={styles.cardTextWhite}>{currentCard?.back}</Text>
            <Text style={styles.tapHintWhite}>Tap to flip back</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>

      <View style={[styles.controls, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[
            styles.controlButton,
            { borderColor: theme.border },
            currentCardIndex === 0 && styles.controlButtonDisabled,
          ]}
          onPress={handlePrevious}
          disabled={currentCardIndex === 0}
        >
          <Text
            style={[
              styles.controlButtonText,
              {
                color:
                  currentCardIndex === 0 ? theme.textSecondary : theme.text,
              },
            ]}
          >
            ← Previous
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.controlButton,
            styles.nextButton,
            { backgroundColor: selectedSubject.color },
          ]}
          onPress={handleNext}
        >
          <Text style={styles.controlButtonTextWhite}>
            {currentCardIndex === currentCards.length - 1 ? "Finish" : "Next →"}
          </Text>
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
  backButtonWhite: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerTitleWhite: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginTop: 8,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  headerContent: {
    alignItems: "center",
  },
  subjectIconLarge: {
    fontSize: 48,
  },
  progressText: {
    fontSize: 14,
    color: "#FFF",
    textAlign: "center",
    marginTop: 10,
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoBox: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
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
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  subjectCard: {
    width: "47%",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    elevation: 2,
  },
  subjectIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  subjectIcon: {
    fontSize: 32,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  cardCount: {
    fontSize: 13,
  },
  flashcardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardTouchable: {
    width: "100%",
    height: 400,
  },
  flashcard: {
    position: "absolute",
    width: "100%",
    height: "100%",
    padding: 30,
    borderRadius: 20,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    backfaceVisibility: "hidden",
  },
  flashcardBack: {
    position: "absolute",
  },
  flashcardVisible: {
    zIndex: 1,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: 20,
  },
  cardLabelWhite: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    color: "#FFF",
    marginBottom: 20,
  },
  cardText: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 32,
  },
  cardTextWhite: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFF",
    textAlign: "center",
    lineHeight: 28,
  },
  tapHint: {
    fontSize: 13,
    marginTop: 20,
    opacity: 0.7,
  },
  tapHintWhite: {
    fontSize: 13,
    color: "#FFF",
    marginTop: 20,
    opacity: 0.9,
  },
  controls: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    elevation: 8,
  },
  controlButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  nextButton: {
    borderWidth: 0,
  },
  controlButtonDisabled: {
    opacity: 0.4,
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  controlButtonTextWhite: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFF",
  },
});
