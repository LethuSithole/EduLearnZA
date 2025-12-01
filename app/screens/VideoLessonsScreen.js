import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function VideoLessonsScreen({ navigation }) {
  const { theme } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState(null);

  const subjects = [
    {
      id: 1,
      name: "Mathematics",
      icon: "🔢",
      color: "#FF6B6B",
      playlists: [
        {
          title: "Algebra Mastery",
          instructor: "Prof. Mathematics",
          videos: 25,
          duration: "8 hours",
          level: "Grade 10-12",
          description:
            "Complete algebra course covering equations, functions, and graphs.",
          topics: [
            "Linear Equations",
            "Quadratic Functions",
            "Exponential Growth",
          ],
        },
        {
          title: "Trigonometry Explained",
          instructor: "Dr. Trig",
          videos: 18,
          duration: "6 hours",
          level: "Grade 11-12",
          description:
            "Master trigonometric ratios, identities, and applications.",
          topics: [
            "Sin, Cos, Tan",
            "Trigonometric Identities",
            "Compound Angles",
          ],
        },
        {
          title: "Calculus Foundations",
          instructor: "Prof. Mathematics",
          videos: 30,
          duration: "10 hours",
          level: "Grade 12",
          description: "Introduction to differentiation and integration.",
          topics: ["Limits", "Derivatives", "Integration Basics"],
        },
      ],
    },
    {
      id: 2,
      name: "Physical Sciences",
      icon: "⚗️",
      color: "#4ECDC4",
      playlists: [
        {
          title: "Physics: Mechanics",
          instructor: "Dr. Physics",
          videos: 22,
          duration: "7 hours",
          level: "Grade 10-12",
          description: "Newton's laws, forces, energy, and motion.",
          topics: ["Newton's Laws", "Work & Energy", "Momentum"],
        },
        {
          title: "Chemistry Basics",
          instructor: "Prof. Chemistry",
          videos: 20,
          duration: "6.5 hours",
          level: "Grade 10-12",
          description:
            "Atomic structure, chemical reactions, and stoichiometry.",
          topics: ["Atoms & Molecules", "Chemical Equations", "Mole Concept"],
        },
        {
          title: "Electricity & Circuits",
          instructor: "Dr. Physics",
          videos: 15,
          duration: "5 hours",
          level: "Grade 10-12",
          description:
            "Understanding circuits, Ohm's law, and electrical principles.",
          topics: ["Current & Voltage", "Ohm's Law", "Series & Parallel"],
        },
      ],
    },
    {
      id: 3,
      name: "Life Sciences",
      icon: "🧬",
      color: "#95E1D3",
      playlists: [
        {
          title: "Cell Biology",
          instructor: "Dr. Bio",
          videos: 16,
          duration: "5 hours",
          level: "Grade 10-12",
          description: "Cell structure, function, and cellular processes.",
          topics: ["Cell Organelles", "Mitosis", "Meiosis"],
        },
        {
          title: "Genetics & DNA",
          instructor: "Prof. Genetics",
          videos: 18,
          duration: "6 hours",
          level: "Grade 11-12",
          description: "Understanding heredity, DNA, and genetic engineering.",
          topics: ["DNA Structure", "Mendelian Genetics", "Genetic Variation"],
        },
        {
          title: "Human Body Systems",
          instructor: "Dr. Bio",
          videos: 24,
          duration: "8 hours",
          level: "Grade 10-12",
          description: "Explore how body systems work together.",
          topics: [
            "Circulatory System",
            "Respiratory System",
            "Nervous System",
          ],
        },
      ],
    },
    {
      id: 4,
      name: "English",
      icon: "📖",
      color: "#FFE66D",
      playlists: [
        {
          title: "Grammar Masterclass",
          instructor: "Mrs. English",
          videos: 20,
          duration: "6 hours",
          level: "Grade 8-12",
          description: "Complete English grammar course.",
          topics: ["Parts of Speech", "Tenses", "Sentence Structure"],
        },
        {
          title: "Literature Analysis",
          instructor: "Prof. Literature",
          videos: 15,
          duration: "5 hours",
          level: "Grade 10-12",
          description: "Analyzing poetry, novels, and drama.",
          topics: ["Themes", "Characterization", "Literary Devices"],
        },
        {
          title: "Essay Writing Skills",
          instructor: "Mrs. English",
          videos: 12,
          duration: "4 hours",
          level: "Grade 10-12",
          description: "Master academic and creative writing.",
          topics: ["Essay Structure", "Argumentation", "Editing"],
        },
      ],
    },
  ];

  const openVideo = (playlist) => {
    Alert.alert(
      playlist.title,
      `Instructor: ${playlist.instructor}\n${playlist.videos} videos • ${
        playlist.duration
      }\n\n${playlist.description}\n\nSearch on YouTube for: "${
        playlist.title
      } ${subjects.find((s) => s.id === selectedSubject)?.name}"`,
      [
        {
          text: "Search YouTube",
          onPress: () => {
            const searchQuery = `${playlist.title} ${
              subjects.find((s) => s.id === selectedSubject)?.name
            }`;
            Linking.openURL(
              `https://www.youtube.com/results?search_query=${encodeURIComponent(
                searchQuery
              )}`
            );
          },
        },
        { text: "Close", style: "cancel" },
      ]
    );
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
              {subject.playlists.length} Video Playlists
            </Text>
          </View>
        </View>

        <ScrollView style={styles.content}>
          {subject.playlists.map((playlist, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.playlistCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
              onPress={() => openVideo(playlist)}
            >
              <View
                style={[
                  styles.thumbnailContainer,
                  { backgroundColor: subject.color + "20" },
                ]}
              >
                <Text style={styles.playIcon}>▶️</Text>
                <View
                  style={[styles.durationBadge, { backgroundColor: "#000" }]}
                >
                  <Text style={styles.durationText}>{playlist.duration}</Text>
                </View>
              </View>
              <View style={styles.playlistInfo}>
                <Text style={[styles.playlistTitle, { color: theme.text }]}>
                  {playlist.title}
                </Text>
                <Text
                  style={[
                    styles.playlistInstructor,
                    { color: theme.textSecondary },
                  ]}
                >
                  👤 {playlist.instructor}
                </Text>
                <Text
                  style={[
                    styles.playlistDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  {playlist.description}
                </Text>
                <View style={styles.playlistMeta}>
                  <View
                    style={[
                      styles.metaBadge,
                      { backgroundColor: subject.color + "20" },
                    ]}
                  >
                    <Text style={[styles.metaText, { color: subject.color }]}>
                      📹 {playlist.videos} videos
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.metaBadge,
                      { backgroundColor: subject.color + "20" },
                    ]}
                  >
                    <Text style={[styles.metaText, { color: subject.color }]}>
                      🎓 {playlist.level}
                    </Text>
                  </View>
                </View>
                <View style={styles.topicsContainer}>
                  {playlist.topics.map((topic, idx) => (
                    <View
                      key={idx}
                      style={[
                        styles.topicChip,
                        { backgroundColor: theme.border },
                      ]}
                    >
                      <Text style={[styles.topicText, { color: theme.text }]}>
                        {topic}
                      </Text>
                    </View>
                  ))}
                </View>
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
          Video Lessons
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Learn through engaging video content
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
          <Text style={styles.infoIcon}>🎥</Text>
          <Text style={[styles.infoText, { color: theme.text }]}>
            Watch expert instructors explain complex concepts through video
            lessons. Perfect for visual learners!
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
                style={[styles.playlistsCount, { color: theme.textSecondary }]}
              >
                {subject.playlists.length} playlists
              </Text>
              <View
                style={[
                  styles.subjectButton,
                  { backgroundColor: subject.color },
                ]}
              >
                <Text style={styles.subjectButtonText}>Watch Videos →</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Popular Channels */}
        <View style={styles.channelsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            📺 Recommended YouTube Channels
          </Text>
          {[
            { name: "Khan Academy", subject: "Math & Science" },
            { name: "Mindset Learn", subject: "SA Curriculum" },
            {
              name: "The Organic Chemistry Tutor",
              subject: "Maths & Sciences",
            },
            { name: "Crash Course", subject: "Various Subjects" },
            { name: "TED-Ed", subject: "Educational Content" },
          ].map((channel, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.channelCard,
                {
                  backgroundColor: theme.surface,
                  borderColor: theme.border,
                },
              ]}
              onPress={() => {
                Linking.openURL(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    channel.name
                  )}`
                );
              }}
            >
              <Text style={styles.channelIcon}>📺</Text>
              <View style={styles.channelInfo}>
                <Text style={[styles.channelName, { color: theme.text }]}>
                  {channel.name}
                </Text>
                <Text
                  style={[
                    styles.channelSubject,
                    { color: theme.textSecondary },
                  ]}
                >
                  {channel.subject}
                </Text>
              </View>
              <Text style={[styles.arrow, { color: theme.primary }]}>→</Text>
            </TouchableOpacity>
          ))}
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
    gap: 15,
    marginBottom: 25,
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
  playlistsCount: {
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
  playlistCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 2,
  },
  thumbnailContainer: {
    height: 120,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  playIcon: {
    fontSize: 48,
  },
  durationBadge: {
    position: "absolute",
    bottom: 10,
    right: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  durationText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  playlistInfo: {
    padding: 15,
  },
  playlistTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  playlistInstructor: {
    fontSize: 14,
    marginBottom: 8,
  },
  playlistDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  playlistMeta: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  metaBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  metaText: {
    fontSize: 12,
    fontWeight: "600",
  },
  topicsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  topicChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  topicText: {
    fontSize: 11,
  },
  channelsSection: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  channelCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    elevation: 2,
  },
  channelIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  channelInfo: {
    flex: 1,
  },
  channelName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  channelSubject: {
    fontSize: 13,
  },
  arrow: {
    fontSize: 20,
    fontWeight: "bold",
  },
  spacer: {
    height: 30,
  },
});
