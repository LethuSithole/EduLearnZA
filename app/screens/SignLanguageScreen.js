import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function SignLanguageScreen({ navigation }) {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      title: "Alphabet (A-Z)",
      icon: "🔤",
      color: "#FF6B6B",
      description: "Learn the SASL finger spelling alphabet",
    },
    {
      id: 2,
      title: "Numbers (0-10)",
      icon: "🔢",
      color: "#4ECDC4",
      description: "Master counting in sign language",
    },
    {
      id: 3,
      title: "Greetings",
      icon: "👋",
      color: "#95E1D3",
      description: "Common greetings and introductions",
    },
    {
      id: 4,
      title: "Classroom Words",
      icon: "📚",
      color: "#FFE66D",
      description: "Essential vocabulary for school",
    },
    {
      id: 5,
      title: "Common Phrases",
      icon: "💬",
      color: "#A29BFE",
      description: "Everyday expressions and phrases",
    },
    {
      id: 6,
      title: "Question Words",
      icon: "❓",
      color: "#FFEAA7",
      description: "How to ask questions in SASL",
    },
  ];

  const signLanguageContent = {
    1: {
      // Alphabet
      title: "SASL Alphabet (Finger Spelling)",
      items: [
        {
          letter: "A",
          description: "Closed fist with thumb on the side",
          tip: "Keep fingers together, thumb pressed against index finger",
        },
        {
          letter: "B",
          description: "Flat hand, fingers together, thumb across palm",
          tip: "All four fingers straight and together",
        },
        {
          letter: "C",
          description: "Curved hand forming 'C' shape",
          tip: "Thumb and fingers form a curved C",
        },
        {
          letter: "D",
          description: "Index finger up, other fingers touch thumb",
          tip: "Circle made by middle, ring, pinky touching thumb",
        },
        {
          letter: "E",
          description: "All fingers bent, thumb across",
          tip: "Fingers curled down, thumb across fingertips",
        },
        {
          letter: "F",
          description: "Index and thumb form circle, other fingers up",
          tip: "Classic 'OK' sign with other three fingers extended",
        },
        {
          letter: "G",
          description: "Index and thumb horizontal, pointing sideways",
          tip: "Like shooting a finger gun pointing left/right",
        },
        {
          letter: "H",
          description: "Index and middle finger horizontal together",
          tip: "Two fingers side by side, pointing sideways",
        },
        {
          letter: "I",
          description: "Pinky finger up, others closed",
          tip: "Only small finger extended straight up",
        },
        {
          letter: "J",
          description: "Pinky up, then trace a 'J' shape",
          tip: "Draw the letter J in the air with your pinky",
        },
        {
          letter: "K",
          description: "Index and middle up in V, thumb touches middle",
          tip: "V-shape with fingers, thumb between them",
        },
        {
          letter: "L",
          description: "Index up, thumb out, forms 'L' shape",
          tip: "Classic L-shape with thumb and index finger",
        },
        {
          letter: "M",
          description: "Thumb under three fingers",
          tip: "Three fingers draped over thumb",
        },
        {
          letter: "N",
          description: "Thumb under two fingers",
          tip: "Two fingers draped over thumb",
        },
        {
          letter: "O",
          description: "All fingers and thumb form circle",
          tip: "Make an 'O' shape with all fingers meeting thumb",
        },
        {
          letter: "P",
          description: "Like 'K' but pointing down",
          tip: "Same as K but hand angled downward",
        },
        {
          letter: "Q",
          description: "Like 'G' but pointing down",
          tip: "Index and thumb pointing down",
        },
        {
          letter: "R",
          description: "Index and middle crossed",
          tip: "Cross your first two fingers",
        },
        {
          letter: "S",
          description: "Closed fist, thumb across fingers",
          tip: "Make a fist with thumb in front",
        },
        {
          letter: "T",
          description: "Thumb between index and middle",
          tip: "Thumb poking out between first two fingers",
        },
        {
          letter: "U",
          description: "Index and middle up together",
          tip: "Two fingers straight up, side by side",
        },
        {
          letter: "V",
          description: "Index and middle up in V-shape",
          tip: "Peace sign / Victory sign",
        },
        {
          letter: "W",
          description: "Three fingers up (index, middle, ring)",
          tip: "Three middle fingers extended upward",
        },
        {
          letter: "X",
          description: "Index finger bent like a hook",
          tip: "Curl index finger into a hook shape",
        },
        {
          letter: "Y",
          description: "Thumb and pinky out (shaka sign)",
          tip: "Hang loose sign - thumb and pinky extended",
        },
        {
          letter: "Z",
          description: "Index finger traces Z in air",
          tip: "Draw the letter Z in the air",
        },
      ],
    },
    2: {
      // Numbers
      title: "Numbers in SASL",
      items: [
        {
          number: "0",
          description: "Form 'O' shape with hand",
          tip: "All fingers and thumb form a circle",
        },
        {
          number: "1",
          description: "Index finger up",
          tip: "Point with one finger straight up",
        },
        {
          number: "2",
          description: "Index and middle finger up",
          tip: "Peace sign with two fingers",
        },
        {
          number: "3",
          description: "Thumb, index, and middle up",
          tip: "Three fingers extended (like 'W' shape)",
        },
        {
          number: "4",
          description: "All fingers up except thumb",
          tip: "Four fingers straight, thumb tucked in",
        },
        {
          number: "5",
          description: "All fingers and thumb spread out",
          tip: "Open hand with all five digits extended",
        },
        {
          number: "6",
          description: "Three fingers down, pinky and thumb touch",
          tip: "Pinky and thumb touching, others folded",
        },
        {
          number: "7",
          description: "Ring finger down, pinky and thumb touch",
          tip: "Similar to 6 but ring finger also folded",
        },
        {
          number: "8",
          description: "Middle and ring down, others touch",
          tip: "Only middle and ring fingers folded down",
        },
        {
          number: "9",
          description: "Index down, others touch",
          tip: "Index finger touches thumb, others extended",
        },
        {
          number: "10",
          description: "Fist with thumb up, shake",
          tip: "Thumbs up gesture with a small shake",
        },
      ],
    },
    3: {
      // Greetings
      title: "Common Greetings",
      items: [
        {
          word: "Hello",
          description: "Open hand near forehead, move forward",
          tip: "Like a salute that moves away from head",
        },
        {
          word: "Goodbye",
          description: "Wave hand back and forth",
          tip: "Standard wave with open hand",
        },
        {
          word: "Good Morning",
          description: "Sign 'good' then raise arms like sunrise",
          tip: "'Good' + arms rising from horizontal to vertical",
        },
        {
          word: "Good Afternoon",
          description: "Sign 'good' then flat hand at angle (sun position)",
          tip: "'Good' + hand shows sun at midday position",
        },
        {
          word: "Good Night",
          description: "Sign 'good' then arms lower like sunset",
          tip: "'Good' + arms lowering horizontally",
        },
        {
          word: "Thank You",
          description: "Touch chin with fingers, move forward",
          tip: "Fingers start at chin, move toward person",
        },
        {
          word: "Please",
          description: "Flat hand on chest, circular motion",
          tip: "Rub chest in circular motion with open hand",
        },
        {
          word: "Sorry / Excuse me",
          description: "Fist on chest, circular motion",
          tip: "Rub chest in circles with closed fist",
        },
        {
          word: "Yes",
          description: "Nod fist up and down",
          tip: "Make a fist and nod it like a head",
        },
        {
          word: "No",
          description: "Shake head, or snap fingers together",
          tip: "Shake head 'no' or snap index and middle to thumb",
        },
      ],
    },
    4: {
      // Classroom Words
      title: "Classroom Vocabulary",
      items: [
        {
          word: "Teacher",
          description: "T-handshape near forehead",
          tip: "Letter 'T' position at temple/forehead area",
        },
        {
          word: "Student / Learn",
          description: "Take information from book to head",
          tip: "Hand moves from flat surface up to forehead",
        },
        {
          word: "Book",
          description: "Palms together, then open like a book",
          tip: "Hands together, then open flat like opening a book",
        },
        {
          word: "Write",
          description: "Mime writing on palm",
          tip: "Pretend to write on your other palm",
        },
        {
          word: "Read",
          description: "Two fingers scan across palm",
          tip: "V-hand moves across flat palm like reading",
        },
        {
          word: "Test / Exam",
          description: "Draw X in air, then open both hands",
          tip: "Form 'X' then spread hands showing paper",
        },
        {
          word: "Paper",
          description: "Flat hands together, pull apart",
          tip: "Palms together, slide apart showing thinness",
        },
        {
          word: "Pen / Pencil",
          description: "Mime writing in air",
          tip: "Hold invisible pen and write in the air",
        },
        {
          word: "Question",
          description: "Draw question mark in air",
          tip: "Index finger traces '?' shape",
        },
        {
          word: "Answer",
          description: "Bring fists from mouth forward",
          tip: "Both fists start at mouth, move forward opening",
        },
        {
          word: "Homework",
          description: "Sign 'home' then 'work'",
          tip: "Touch cheek, then hammer fists together",
        },
        {
          word: "Help",
          description: "Thumbs up on flat palm, lift together",
          tip: "Bottom hand helps lift top hand up",
        },
      ],
    },
    5: {
      // Common Phrases
      title: "Everyday Phrases",
      items: [
        {
          phrase: "My name is...",
          description:
            "Point to self, then H-handshape forward, then spell name",
          tip: "ME + NAME (H-fingers tap) + fingerspell your name",
        },
        {
          phrase: "Nice to meet you",
          description: "NICE + MEET + YOU",
          tip: "Slide hand across chin + palms meet + point",
        },
        {
          phrase: "How are you?",
          description: "Fists together, roll apart + point",
          tip: "HOW (roll fists) + YOU (point forward)",
        },
        {
          phrase: "I am fine",
          description: "Point to self + flat hand on chest tap",
          tip: "ME + FINE (tap chest with flat hand)",
        },
        {
          phrase: "I don't understand",
          description: "Point to forehead, wave hand 'no'",
          tip: "Touch forehead + shake hand side to side",
        },
        {
          phrase: "Can you help me?",
          description: "YOU + HELP + ME",
          tip: "Point + helping gesture + point to self",
        },
        {
          phrase: "Where is the bathroom?",
          description: "WHERE + T-handshape shake",
          tip: "Wiggle index finger + shake 'T' (for toilet)",
        },
        {
          phrase: "I am hungry",
          description: "Point to self + claw hand down chest",
          tip: "ME + HUNGRY (claw pulls down throat/chest)",
        },
        {
          phrase: "I am tired",
          description: "Point to self + bent hands drop at chest",
          tip: "ME + TIRED (hands droop down at shoulders)",
        },
        {
          phrase: "What is your name?",
          description: "Point forward + H-fingers tap + point",
          tip: "YOUR + NAME (H-handshape) + YOU",
        },
      ],
    },
    6: {
      // Question Words
      title: "Question Words",
      items: [
        {
          word: "What",
          description: "Wiggle index finger",
          tip: "Shake index finger side to side",
        },
        {
          word: "Where",
          description: "Index finger shakes side to side",
          tip: "Point and wiggle finger left-right",
        },
        {
          word: "When",
          description: "Index finger circles then points",
          tip: "Circle motion ending with point",
        },
        {
          word: "Who",
          description: "Index finger circles near mouth",
          tip: "Circle around lips with index finger",
        },
        {
          word: "Why",
          description: "Touch forehead, pull away as 'Y' shape",
          tip: "Forehead to 'Y' handshape moving forward",
        },
        {
          word: "How",
          description: "Fists together, roll outward",
          tip: "Knuckles touch, roll hands apart",
        },
        {
          word: "Which",
          description: "Alternating hand positions",
          tip: "Hands alternate up and down (A-handshape)",
        },
        {
          word: "How much / How many",
          description: "Start fists, flick fingers open",
          tip: "Closed fists suddenly spread fingers",
        },
        {
          word: "Can",
          description: "Both fists move down together",
          tip: "Both S-handshapes move downward firmly",
        },
        {
          word: "Want",
          description: "Claw hands pull toward body",
          tip: "Both hands in claw shape, pull inward",
        },
      ],
    },
  };

  if (selectedCategory) {
    const content = signLanguageContent[selectedCategory];
    const category = categories.find((c) => c.id === selectedCategory);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: category.color || theme.primary },
          ]}
        >
          <TouchableOpacity onPress={() => setSelectedCategory(null)}>
            <Text style={styles.backButtonWhite}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.categoryIconLarge}>{category.icon}</Text>
            <Text style={styles.headerTitleWhite}>{content.title}</Text>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {content.items.map((item, index) => (
            <View
              key={index}
              style={[
                styles.signCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
            >
              <View style={styles.signHeader}>
                <Text
                  style={[
                    styles.signTitle,
                    { color: category.color || theme.primary },
                  ]}
                >
                  {item.letter || item.number || item.word || item.phrase}
                </Text>
              </View>
              <Text style={[styles.signDescription, { color: theme.text }]}>
                {item.description}
              </Text>
              <View
                style={[
                  styles.tipBox,
                  { backgroundColor: category.color + "15" },
                ]}
              >
                <Text style={styles.tipIcon}>💡</Text>
                <Text style={[styles.tipText, { color: theme.text }]}>
                  {item.tip}
                </Text>
              </View>
            </View>
          ))}

          <View style={styles.spacer} />
        </ScrollView>
      </SafeAreaView>
    );
  }

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
          South African Sign Language
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Learn basic SASL for inclusive communication
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Introduction */}
        <View
          style={[
            styles.introBox,
            {
              backgroundColor: theme.primary + "15",
              borderColor: theme.primary,
            },
          ]}
        >
          <Text style={styles.introIcon}>🤟</Text>
          <Text style={[styles.introTitle, { color: theme.primary }]}>
            About SASL
          </Text>
          <Text style={[styles.introText, { color: theme.text }]}>
            South African Sign Language (SASL) is the primary sign language used
            by Deaf communities in South Africa. It is a complete language with
            its own grammar and syntax.
          </Text>
          <Text style={[styles.introText, { color: theme.text }]}>
            Learning SASL promotes inclusion and helps you communicate with Deaf
            students and community members.
          </Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Choose a Category
          </Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor: theme.surface,
                    borderColor: theme.border,
                  },
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <View
                  style={[
                    styles.categoryIconContainer,
                    { backgroundColor: category.color + "20" },
                  ]}
                >
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                </View>
                <Text style={[styles.categoryTitle, { color: theme.text }]}>
                  {category.title}
                </Text>
                <Text
                  style={[
                    styles.categoryDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  {category.description}
                </Text>
                <View
                  style={[
                    styles.categoryButton,
                    { backgroundColor: category.color },
                  ]}
                >
                  <Text style={styles.categoryButtonText}>Learn →</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Learning Tips */}
        <View
          style={[
            styles.tipsSection,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={[styles.tipsSectionTitle, { color: theme.text }]}>
            📖 Learning Tips
          </Text>
          <View style={styles.tipsList}>
            <Text style={[styles.tipItem, { color: theme.text }]}>
              ✓ Practice regularly - even 10 minutes daily helps!
            </Text>
            <Text style={[styles.tipItem, { color: theme.text }]}>
              ✓ Watch your hand positions in a mirror
            </Text>
            <Text style={[styles.tipItem, { color: theme.text }]}>
              ✓ Practice with friends to build confidence
            </Text>
            <Text style={[styles.tipItem, { color: theme.text }]}>
              ✓ Respect Deaf culture and community
            </Text>
            <Text style={[styles.tipItem, { color: theme.text }]}>
              ✓ Be patient - learning a new language takes time
            </Text>
          </View>
        </View>

        {/* Resources */}
        <View style={styles.resourcesSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Additional Resources
          </Text>
          <TouchableOpacity
            style={[
              styles.resourceCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
            onPress={() =>
              Alert.alert(
                "SASL Videos",
                "Search YouTube for:\n\n" +
                  "• 'SASL Tutorials'\n" +
                  "• 'Deaf Federation of SA'\n" +
                  "• 'Sign Language Lessons South Africa'\n\n" +
                  "These channels offer excellent video tutorials!"
              )
            }
          >
            <Text style={styles.resourceIcon}>🎥</Text>
            <Text style={[styles.resourceTitle, { color: theme.text }]}>
              Video Tutorials
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.resourceCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
            onPress={() =>
              Alert.alert(
                "SASL Dictionary",
                "Visit the Deaf Federation of South Africa (DeafSA) website for a comprehensive SASL dictionary and resources."
              )
            }
          >
            <Text style={styles.resourceIcon}>📚</Text>
            <Text style={[styles.resourceTitle, { color: theme.text }]}>
              Online Dictionary
            </Text>
          </TouchableOpacity>
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
  },
  headerSubtitle: {
    fontSize: 14,
  },
  headerContent: {
    alignItems: "center",
  },
  categoryIconLarge: {
    fontSize: 48,
    marginBottom: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  introBox: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 25,
  },
  introIcon: {
    fontSize: 48,
    textAlign: "center",
    marginBottom: 15,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  introText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 10,
  },
  categoriesSection: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  categoriesGrid: {
    gap: 15,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
  },
  categoryIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  categoryDescription: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  categoryButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  categoryButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  signCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
    elevation: 2,
  },
  signHeader: {
    marginBottom: 12,
  },
  signTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  signDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
  },
  tipBox: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 8,
    alignItems: "flex-start",
  },
  tipIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    fontStyle: "italic",
  },
  tipsSection: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 25,
  },
  tipsSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  tipsList: {
    gap: 10,
  },
  tipItem: {
    fontSize: 14,
    lineHeight: 22,
  },
  resourcesSection: {
    marginBottom: 20,
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    elevation: 2,
  },
  resourceIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  spacer: {
    height: 30,
  },
});
