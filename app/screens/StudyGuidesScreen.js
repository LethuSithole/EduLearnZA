import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function StudyGuidesScreen({ navigation }) {
  const { theme } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      icon: "🔢",
      color: "#FF6B6B",
      guides: [
        {
          title: "Algebra Basics",
          grade: "10-12",
          topics: ["Linear Equations", "Quadratic Equations", "Inequalities"],
          description:
            "Master fundamental algebraic concepts and problem-solving techniques.",
        },
        {
          title: "Geometry & Trigonometry",
          grade: "10-12",
          topics: ["Angles", "Triangles", "Circles", "Trigonometric Ratios"],
          description:
            "Learn geometric properties and trigonometric functions.",
        },
        {
          title: "Calculus Introduction",
          grade: "11-12",
          topics: ["Differentiation", "Integration", "Rate of Change"],
          description: "Introduction to calculus concepts for Grade 11-12.",
        },
        {
          title: "Statistics & Probability",
          grade: "10-12",
          topics: ["Mean, Median, Mode", "Standard Deviation", "Probability"],
          description: "Statistical analysis and probability theory.",
        },
      ],
    },
    {
      id: 2,
      name: "Physical Sciences",
      icon: "⚗️",
      color: "#4ECDC4",
      guides: [
        {
          title: "Mechanics",
          grade: "10-12",
          topics: ["Newton's Laws", "Forces", "Motion", "Energy"],
          description: "Physics of motion and forces.",
        },
        {
          title: "Electricity & Magnetism",
          grade: "10-12",
          topics: ["Circuits", "Ohm's Law", "Magnetic Fields"],
          description: "Electrical principles and magnetic phenomena.",
        },
        {
          title: "Chemical Reactions",
          grade: "10-12",
          topics: ["Chemical Equations", "Stoichiometry", "Reaction Types"],
          description: "Understanding chemical reactions and equations.",
        },
        {
          title: "Atomic Structure",
          grade: "10-12",
          topics: ["Atoms", "Periodic Table", "Chemical Bonding"],
          description: "Structure of atoms and chemical bonding.",
        },
      ],
    },
    {
      id: 3,
      name: "Life Sciences",
      icon: "🧬",
      color: "#95E1D3",
      guides: [
        {
          title: "Cell Biology",
          grade: "10-12",
          topics: ["Cell Structure", "Cell Division", "Mitosis & Meiosis"],
          description: "Understanding cells and cellular processes.",
        },
        {
          title: "Genetics & DNA",
          grade: "10-12",
          topics: ["DNA Structure", "Heredity", "Genetic Engineering"],
          description: "Genetics principles and DNA technology.",
        },
        {
          title: "Human Body Systems",
          grade: "10-12",
          topics: ["Circulatory", "Respiratory", "Nervous System"],
          description: "How body systems work together.",
        },
        {
          title: "Ecology & Environment",
          grade: "10-12",
          topics: ["Ecosystems", "Biodiversity", "Conservation"],
          description: "Environmental science and conservation.",
        },
      ],
    },
    {
      id: 4,
      name: "English",
      icon: "📖",
      color: "#FFE66D",
      guides: [
        {
          title: "Grammar Essentials",
          grade: "8-12",
          topics: ["Parts of Speech", "Sentence Structure", "Punctuation"],
          description: "Master English grammar rules.",
        },
        {
          title: "Literature Analysis",
          grade: "10-12",
          topics: ["Themes", "Characters", "Literary Devices"],
          description: "Analyzing poetry, novels, and drama.",
        },
        {
          title: "Essay Writing",
          grade: "10-12",
          topics: ["Structure", "Argumentation", "Academic Writing"],
          description: "Write effective essays and compositions.",
        },
        {
          title: "Comprehension Skills",
          grade: "8-12",
          topics: ["Reading Strategies", "Critical Thinking", "Inference"],
          description: "Improve reading comprehension.",
        },
      ],
    },
    {
      id: 5,
      name: "History",
      icon: "📜",
      color: "#A29BFE",
      guides: [
        {
          title: "South African History",
          grade: "10-12",
          topics: ["Apartheid", "Democracy", "Mandela Era"],
          description: "Key events in SA history.",
        },
        {
          title: "World Wars",
          grade: "10-12",
          topics: ["WWI", "WWII", "Cold War"],
          description: "Major 20th century conflicts.",
        },
        {
          title: "African History",
          grade: "10-12",
          topics: ["Colonialism", "Independence", "Pan-Africanism"],
          description: "African historical developments.",
        },
      ],
    },
    {
      id: 6,
      name: "Geography",
      icon: "🌍",
      color: "#FFEAA7",
      guides: [
        {
          title: "Physical Geography",
          grade: "10-12",
          topics: ["Landforms", "Climate", "Weather Patterns"],
          description: "Earth's physical features.",
        },
        {
          title: "Map Skills",
          grade: "10-12",
          topics: ["Scale", "Coordinates", "Map Reading"],
          description: "Master cartographic skills.",
        },
        {
          title: "Human Geography",
          grade: "10-12",
          topics: ["Population", "Urbanization", "Development"],
          description: "Human-environment interactions.",
        },
      ],
    },
  ];

  const filteredSubjects = subjects
    .map((subject) => ({
      ...subject,
      guides: subject.guides.filter(
        (guide) =>
          guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          guide.topics.some((topic) =>
            topic.toLowerCase().includes(searchQuery.toLowerCase())
          )
      ),
    }))
    .filter((subject) => subject.guides.length > 0);

  const handleGuidePress = (guide, subject) => {
    navigation.navigate("StudyGuideContent", {
      guide,
      subject,
    });
  };

  if (selectedSubject) {
    const subject = subjects.find((s) => s.id === selectedSubject);

    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View
          style={[
            styles.header,
            { backgroundColor: subject.color || theme.primary },
          ]}
        >
          <TouchableOpacity onPress={() => setSelectedSubject(null)}>
            <Text style={styles.backButtonWhite}>← Back</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.subjectIconLarge}>{subject.icon}</Text>
            <Text style={styles.headerTitleWhite}>{subject.name}</Text>
            <Text style={styles.headerSubtitleWhite}>
              {subject.guides.length} Study Guides
            </Text>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {subject.guides.map((guide, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.guideCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
              onPress={() => handleGuidePress(guide, subject)}
            >
              <View style={styles.guideHeader}>
                <Text style={[styles.guideTitle, { color: theme.text }]}>
                  {guide.title}
                </Text>
                <View
                  style={[
                    styles.gradeBadge,
                    { backgroundColor: subject.color + "20" },
                  ]}
                >
                  <Text
                    style={[styles.gradeBadgeText, { color: subject.color }]}
                  >
                    Grade {guide.grade}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.guideDescription,
                  { color: theme.textSecondary },
                ]}
              >
                {guide.description}
              </Text>
              <View style={styles.topicsContainer}>
                {guide.topics.map((topic, idx) => (
                  <View
                    key={idx}
                    style={[
                      styles.topicChip,
                      {
                        backgroundColor: subject.color + "15",
                        borderColor: subject.color,
                      },
                    ]}
                  >
                    <Text style={[styles.topicText, { color: subject.color }]}>
                      {topic}
                    </Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
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
          Study Guides
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Comprehensive guides for all subjects
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBox,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search guides or topics..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {searchQuery ? (
          // Show filtered results
          filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              <View key={subject.id} style={styles.searchResultSection}>
                <Text
                  style={[styles.searchResultSubject, { color: theme.text }]}
                >
                  {subject.icon} {subject.name}
                </Text>
                {subject.guides.map((guide, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.guideCard,
                      {
                        backgroundColor: theme.surface,
                        borderColor: theme.border,
                      },
                    ]}
                    onPress={() => handleGuidePress(guide, subject)}
                  >
                    <Text style={[styles.guideTitle, { color: theme.text }]}>
                      {guide.title}
                    </Text>
                    <Text
                      style={[
                        styles.guideDescription,
                        { color: theme.textSecondary },
                      ]}
                    >
                      {guide.description}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={[styles.emptyText, { color: theme.text }]}>
                No guides found
              </Text>
            </View>
          )
        ) : (
          // Show subjects grid
          <>
            <View
              style={[
                styles.infoBox,
                {
                  backgroundColor: theme.primary + "15",
                  borderColor: theme.primary,
                },
              ]}
            >
              <Text style={styles.infoIcon}>📚</Text>
              <Text style={[styles.infoText, { color: theme.text }]}>
                Access comprehensive study guides covering all major topics.
                Each guide includes explanations, examples, and practice
                materials.
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
                  onPress={() => setSelectedSubject(subject.id)}
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
                    style={[styles.guidesCount, { color: theme.textSecondary }]}
                  >
                    {subject.guides.length} guides
                  </Text>
                  <View
                    style={[
                      styles.subjectButton,
                      { backgroundColor: subject.color },
                    ]}
                  >
                    <Text style={styles.subjectButtonText}>View Guides →</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

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
  headerSubtitleWhite: {
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
    marginTop: 5,
  },
  headerContent: {
    alignItems: "center",
  },
  subjectIconLarge: {
    fontSize: 48,
    marginBottom: 10,
  },
  searchContainer: {
    padding: 20,
    paddingTop: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  searchIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
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
    gap: 15,
  },
  subjectCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
  },
  subjectIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  subjectIcon: {
    fontSize: 32,
  },
  subjectName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  guidesCount: {
    fontSize: 14,
    marginBottom: 15,
  },
  subjectButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  subjectButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  guideCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
    elevation: 2,
  },
  guideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  guideTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    marginRight: 10,
  },
  gradeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  gradeBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  guideDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  topicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topicChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  topicText: {
    fontSize: 12,
    fontWeight: "600",
  },
  searchResultSection: {
    marginBottom: 25,
  },
  searchResultSubject: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 16,
  },
  spacer: {
    height: 30,
  },
});
