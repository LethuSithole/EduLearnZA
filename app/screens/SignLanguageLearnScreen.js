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

export default function SignLanguageLearnScreen({ navigation }) {
  const { theme } = useTheme();
  const [activeCategory, setActiveCategory] = useState("basics");

  const categories = [
    { id: "basics", label: "Basics", icon: "👋" },
    { id: "alphabet", label: "Alphabet", icon: "🔤" },
    { id: "numbers", label: "Numbers", icon: "🔢" },
    { id: "greetings", label: "Greetings", icon: "🤝" },
    { id: "family", label: "Family", icon: "👨‍👩‍👧‍👦" },
    { id: "school", label: "School", icon: "🏫" },
    { id: "emotions", label: "Emotions", icon: "😊" },
    { id: "common", label: "Common Words", icon: "💬" },
  ];

  const lessons = {
    basics: {
      title: "Sign Language Basics",
      description: "Learn the fundamentals of sign language communication",
      content: [
        {
          title: "What is Sign Language?",
          description:
            "Sign language is a visual language that uses hand movements, facial expressions, and body language to communicate.",
          tips: [
            "Each country has its own sign language (e.g., SASL - South African Sign Language)",
            "Facial expressions are crucial - they show emotion and grammar",
            "Body language adds context and meaning",
            "Practice regularly to build muscle memory",
          ],
        },
        {
          title: "Basic Hand Shapes",
          description: "Common hand positions used in sign language:",
          signs: [
            { name: "Flat Hand", use: "Used for many basic signs" },
            { name: "Fist", use: "Used in alphabet letters and numbers" },
            { name: "Point", use: "For indicating direction or person" },
            { name: "Cup Hand", use: "Used for concepts like 'drink'" },
            { name: "Pinch", use: "For small or precise concepts" },
          ],
        },
        {
          title: "Important Rules",
          tips: [
            "Maintain eye contact while signing",
            "Keep signs visible and clear",
            "Use appropriate facial expressions",
            "Sign at a comfortable, steady pace",
            "Be patient and practice regularly",
          ],
        },
      ],
    },
    alphabet: {
      title: "Sign Language Alphabet (A-Z)",
      description: "Learn to fingerspell the alphabet",
      content: [
        {
          title: "Letters A-F",
          signs: [
            { letter: "A", description: "Closed fist with thumb on side" },
            { letter: "B", description: "Flat hand, thumb across palm" },
            { letter: "C", description: "Curved hand like letter C" },
            { letter: "D", description: "Index finger up, others touch thumb" },
            { letter: "E", description: "Fingers bent, touching thumb" },
            { letter: "F", description: "OK sign, thumb and index touching" },
          ],
        },
        {
          title: "Letters G-L",
          signs: [
            {
              letter: "G",
              description: "Index finger and thumb pointing sideways",
            },
            { letter: "H", description: "Index and middle finger sideways" },
            { letter: "I", description: "Pinky finger up" },
            { letter: "J", description: "Pinky finger draws J in air" },
            { letter: "K", description: "Index up, middle out, thumb between" },
            { letter: "L", description: "L shape with thumb and index" },
          ],
        },
        {
          title: "Letters M-R",
          signs: [
            { letter: "M", description: "Three fingers over thumb" },
            { letter: "N", description: "Two fingers over thumb" },
            { letter: "O", description: "All fingers touch thumb (circle)" },
            { letter: "P", description: "Like K but pointing down" },
            { letter: "Q", description: "Like G but pointing down" },
            { letter: "R", description: "Index and middle crossed" },
          ],
        },
        {
          title: "Letters S-Z",
          signs: [
            { letter: "S", description: "Closed fist, thumb across fingers" },
            { letter: "T", description: "Thumb between index and middle" },
            { letter: "U", description: "Index and middle up together" },
            { letter: "V", description: "Index and middle apart (peace sign)" },
            { letter: "W", description: "Three middle fingers up" },
            { letter: "X", description: "Bent index finger" },
            { letter: "Y", description: "Thumb and pinky out (hang loose)" },
            { letter: "Z", description: "Draw Z in air with index finger" },
          ],
        },
      ],
    },
    numbers: {
      title: "Numbers in Sign Language",
      description: "Learn to sign numbers 0-100",
      content: [
        {
          title: "Numbers 0-10",
          signs: [
            { number: "0", description: "O shape with hand" },
            { number: "1", description: "Index finger up" },
            { number: "2", description: "Index and middle up (peace sign)" },
            { number: "3", description: "Thumb, index, middle up" },
            { number: "4", description: "Four fingers up (not thumb)" },
            { number: "5", description: "All five fingers spread" },
            { number: "6", description: "Thumb and pinky touching" },
            { number: "7", description: "Thumb and ring touching" },
            { number: "8", description: "Thumb and middle touching" },
            { number: "9", description: "Thumb and index touching" },
            { number: "10", description: "Fist with thumb up, shake" },
          ],
        },
        {
          title: "Numbers 11-20",
          description:
            "For 11-15, flick the finger twice. For 16-19, twist the number.",
          signs: [
            { number: "11", description: "Flick index finger twice" },
            { number: "12", description: "Flick 2 fingers twice" },
            { number: "13", description: "Flick 3 fingers twice" },
            { number: "14", description: "Flick 4 fingers twice" },
            { number: "15", description: "Flick 5 fingers twice" },
            { number: "16-19", description: "Make number, then twist wrist" },
            { number: "20", description: "Touch thumb and index, open twice" },
          ],
        },
        {
          title: "Larger Numbers",
          tips: [
            "For 21-99: Sign tens digit, then ones digit",
            "100: Sign '1' then 'C' hand shape",
            "1000: Touch middle finger to palm, then show '1'",
            "Practice counting forward and backward",
          ],
        },
      ],
    },
    greetings: {
      title: "Common Greetings",
      description: "Essential greetings and pleasantries",
      content: [
        {
          title: "Basic Greetings",
          signs: [
            {
              word: "Hello",
              description: "Hand to forehead, move forward (like salute)",
            },
            {
              word: "Good Morning",
              description: "Sign 'good' then 'morning' (arm up like sunrise)",
            },
            {
              word: "Good Afternoon",
              description: "Sign 'good' then 'afternoon' (arm horizontal)",
            },
            {
              word: "Good Evening",
              description: "Sign 'good' then 'evening' (arm down)",
            },
            {
              word: "Good Night",
              description: "Sign 'good' then 'night' (arm down, hand over)",
            },
          ],
        },
        {
          title: "Questions",
          signs: [
            {
              word: "How are you?",
              description: "Touch chest, then question face + both hands up",
            },
            {
              word: "What's your name?",
              description: "Point to them, then H-hands together (name sign)",
            },
            {
              word: "Where?",
              description: "Index finger up, shake side to side",
            },
            {
              word: "When?",
              description: "Point forward, circle and point again",
            },
            {
              word: "Why?",
              description: "Touch forehead, then pull forward to Y-hand",
            },
          ],
        },
        {
          title: "Responses",
          signs: [
            {
              word: "Fine/Good",
              description: "Flat hand at chin, move forward",
            },
            { word: "Thank you", description: "Fingers at chin, move forward" },
            {
              word: "You're welcome",
              description: "Flat hand from lips forward",
            },
            { word: "Sorry", description: "Fist circles on chest" },
            { word: "Please", description: "Hand circles on chest" },
          ],
        },
      ],
    },
    family: {
      title: "Family Members",
      description: "Signs for family relationships",
      content: [
        {
          title: "Parents & Children",
          signs: [
            {
              word: "Mother",
              description: "Open hand, thumb touches chin",
            },
            {
              word: "Father",
              description: "Open hand, thumb touches forehead",
            },
            {
              word: "Parents",
              description: "Sign father, then mother",
            },
            {
              word: "Baby",
              description: "Arms cradle imaginary baby, rock",
            },
            {
              word: "Child",
              description: "Pat air down (indicating height)",
            },
            {
              word: "Son",
              description: "Sign 'boy' then 'baby'",
            },
            {
              word: "Daughter",
              description: "Sign 'girl' then 'baby'",
            },
          ],
        },
        {
          title: "Siblings",
          signs: [
            {
              word: "Brother",
              description: "Sign 'boy' then index fingers together",
            },
            {
              word: "Sister",
              description: "Sign 'girl' then index fingers together",
            },
            {
              word: "Siblings",
              description: "S-hand moves from one shoulder to other",
            },
          ],
        },
        {
          title: "Extended Family",
          signs: [
            {
              word: "Grandmother",
              description: "Sign 'mother' and move forward twice",
            },
            {
              word: "Grandfather",
              description: "Sign 'father' and move forward twice",
            },
            {
              word: "Aunt",
              description: "A-hand near cheek, shake",
            },
            {
              word: "Uncle",
              description: "U-hand near temple, shake",
            },
            {
              word: "Cousin",
              description: "C-hand near temple, twist",
            },
          ],
        },
      ],
    },
    school: {
      title: "School & Education",
      description: "Signs related to school and learning",
      content: [
        {
          title: "School Places",
          signs: [
            {
              word: "School",
              description: "Clap hands twice (teacher getting attention)",
            },
            {
              word: "Class",
              description: "C-hands move in circle",
            },
            {
              word: "Library",
              description: "L-hand circles",
            },
            {
              word: "Cafeteria",
              description: "C-hand at mouth, moves away",
            },
          ],
        },
        {
          title: "People",
          signs: [
            {
              word: "Teacher",
              description: "O-hands at temples, move forward",
            },
            {
              word: "Student",
              description: "Five fingers on palm, close to flat hand",
            },
            {
              word: "Principal",
              description: "P-hand circles above head",
            },
            {
              word: "Friend",
              description: "Hook index fingers together, switch",
            },
          ],
        },
        {
          title: "Activities",
          signs: [
            {
              word: "Read",
              description: "V-hand moves down over palm (scanning)",
            },
            {
              word: "Write",
              description: "Pinch fingers on palm (pen writing)",
            },
            {
              word: "Study",
              description: "Flat hand wiggles toward book",
            },
            {
              word: "Test",
              description: "Index fingers draw question marks",
            },
            {
              word: "Learn",
              description: "Five fingers on palm, move to forehead",
            },
          ],
        },
        {
          title: "Subjects",
          signs: [
            {
              word: "Mathematics",
              description: "M-hands cross at wrists twice",
            },
            {
              word: "Science",
              description: "A-hands alternate circles (mixing beaker)",
            },
            {
              word: "English",
              description: "Hands grip and shake (holding England)",
            },
            {
              word: "History",
              description: "H-hand moves back over shoulder",
            },
          ],
        },
      ],
    },
    emotions: {
      title: "Emotions & Feelings",
      description: "Express how you feel",
      content: [
        {
          title: "Positive Emotions",
          signs: [
            {
              word: "Happy",
              description: "Flat hands brush up chest twice (joy rising)",
            },
            {
              word: "Excited",
              description: "Middle fingers alternate brushing chest",
            },
            {
              word: "Love",
              description: "Crossed fists over heart",
            },
            {
              word: "Proud",
              description: "Thumb moves up chest",
            },
            {
              word: "Grateful",
              description: "Flat hand circles chest, moves forward",
            },
          ],
        },
        {
          title: "Negative Emotions",
          signs: [
            {
              word: "Sad",
              description: "Fingers drag down face (like tears)",
            },
            {
              word: "Angry",
              description: "Clawed hand at face, pull away sharply",
            },
            {
              word: "Frustrated",
              description: "Open hand hits forehead",
            },
            {
              word: "Worried",
              description: "Bent hands alternate circles in front of face",
            },
            {
              word: "Tired",
              description: "Bent hands at chest, drop down",
            },
          ],
        },
        {
          title: "Neutral Emotions",
          signs: [
            {
              word: "Okay",
              description: "O and K handshapes",
            },
            {
              word: "Confused",
              description: "Index finger circles at temple",
            },
            {
              word: "Surprised",
              description: "Index fingers and thumbs snap open at eyes",
            },
            {
              word: "Bored",
              description: "Index finger twists at nose",
            },
          ],
        },
      ],
    },
    common: {
      title: "Common Words",
      description: "Everyday vocabulary",
      content: [
        {
          title: "Basic Verbs",
          signs: [
            { word: "Go", description: "Index fingers point and move forward" },
            { word: "Come", description: "Index fingers beckon toward you" },
            { word: "Stop", description: "Flat hand chops down on palm" },
            { word: "Wait", description: "Wiggling fingers, palms up" },
            { word: "Help", description: "Fist on palm, lift together" },
            { word: "Want", description: "Clawed hands pull toward body" },
            { word: "Need", description: "X-hand moves down sharply" },
            {
              word: "Like",
              description: "Middle finger and thumb pull from chest",
            },
          ],
        },
        {
          title: "Yes/No & Questions",
          signs: [
            { word: "Yes", description: "Fist nods like head nodding" },
            { word: "No", description: "Index, middle and thumb snap shut" },
            { word: "Maybe", description: "Flat hands alternate up and down" },
            { word: "Question", description: "Draw question mark in air" },
            {
              word: "Answer",
              description: "Index fingers move to mouth then forward",
            },
          ],
        },
        {
          title: "Time",
          signs: [
            { word: "Today", description: "Sign 'now' twice (hands down)" },
            {
              word: "Tomorrow",
              description: "Thumb touches cheek, moves forward",
            },
            {
              word: "Yesterday",
              description: "Thumb touches cheek, moves back",
            },
            { word: "Week", description: "Index finger slides across palm" },
            {
              word: "Month",
              description: "Index fingers slide down each other",
            },
            { word: "Year", description: "S-hands circle around each other" },
          ],
        },
        {
          title: "Colors",
          signs: [
            {
              word: "Red",
              description: "Index finger brushes down lips twice",
            },
            { word: "Blue", description: "B-hand shakes" },
            { word: "Green", description: "G-hand shakes" },
            { word: "Yellow", description: "Y-hand shakes" },
            { word: "Black", description: "Index finger across forehead" },
            {
              word: "White",
              description: "Five fingers on chest, pull to O-shape",
            },
          ],
        },
      ],
    },
  };

  const renderContent = () => {
    const lesson = lessons[activeCategory];

    return (
      <View style={styles.lessonContainer}>
        <Text style={[styles.lessonTitle, { color: theme.text }]}>
          {lesson.title}
        </Text>
        <Text
          style={[styles.lessonDescription, { color: theme.textSecondary }]}
        >
          {lesson.description}
        </Text>

        {lesson.content.map((section, index) => (
          <View
            key={index}
            style={[styles.section, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              {section.title}
            </Text>

            {section.description && (
              <Text
                style={[
                  styles.sectionDescription,
                  { color: theme.textSecondary },
                ]}
              >
                {section.description}
              </Text>
            )}

            {section.signs && (
              <View style={styles.signsGrid}>
                {section.signs.map((sign, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.signCard,
                      { backgroundColor: theme.background },
                    ]}
                  >
                    <Text style={[styles.signWord, { color: theme.primary }]}>
                      {sign.word || sign.letter || sign.number || sign.name}
                    </Text>
                    <Text
                      style={[
                        styles.signDescription,
                        { color: theme.textSecondary },
                      ]}
                    >
                      {sign.description || sign.use}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {section.tips && (
              <View style={styles.tipsList}>
                {section.tips.map((tip, idx) => (
                  <View key={idx} style={styles.tipItem}>
                    <Text style={[styles.tipBullet, { color: theme.primary }]}>
                      •
                    </Text>
                    <Text
                      style={[styles.tipText, { color: theme.textSecondary }]}
                    >
                      {tip}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        <View style={[styles.practiceCard, { backgroundColor: "#845EC2" }]}>
          <Text style={styles.practiceTitle}>💡 Practice Tip</Text>
          <Text style={styles.practiceText}>
            Practice these signs daily in front of a mirror. Start slow and
            focus on accuracy before speed. Watch videos of native signers to
            improve your fluency!
          </Text>
        </View>
      </View>
    );
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
          🤟 Sign Language
        </Text>
        <View style={styles.placeholder} />
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[styles.tabsContainer, { backgroundColor: theme.surface }]}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.tab,
              {
                backgroundColor:
                  activeCategory === category.id ? "#845EC2" : "transparent",
              },
            ]}
            onPress={() => setActiveCategory(category.id)}
          >
            <Text style={styles.tabIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.tabLabel,
                {
                  color: activeCategory === category.id ? "#fff" : theme.text,
                },
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Content */}
      <ScrollView style={styles.scrollView}>{renderContent()}</ScrollView>
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
  placeholder: {
    width: 50,
  },
  tabsContainer: {
    maxHeight: 70,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  tabIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  lessonContainer: {
    padding: 20,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  lessonDescription: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 24,
  },
  section: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 15,
    marginBottom: 15,
    lineHeight: 22,
  },
  signsGrid: {
    gap: 12,
  },
  signCard: {
    padding: 15,
    borderRadius: 8,
    marginBottom: 8,
  },
  signWord: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  signDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  tipsList: {
    gap: 10,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipBullet: {
    fontSize: 20,
    marginRight: 10,
    marginTop: -2,
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
  },
  practiceCard: {
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  practiceText: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 22,
  },
});
