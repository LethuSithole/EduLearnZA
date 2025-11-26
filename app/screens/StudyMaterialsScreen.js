import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";

export default function StudyMaterialsScreen() {
  const { theme } = useTheme();
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const subjects = [
    { id: "1", name: "Mathematics", icon: "🔢", color: "#FF6B6B" },
    { id: "2", name: "Science", icon: "🔬", color: "#4ECDC4" },
    { id: "3", name: "English", icon: "📚", color: "#95E1D3" },
    { id: "4", name: "History", icon: "📜", color: "#FFE66D" },
    { id: "5", name: "Geography", icon: "🌍", color: "#98D8C8" },
    { id: "6", name: "Sign Language", icon: "🤟", color: "#845EC2" },
  ];

  const aiFeatures = [
    {
      id: "1",
      title: "AI Study Assistant",
      description: "Ask questions and get instant answers from our AI tutor",
      icon: "🤖",
      color: "#6200EE",
      action: "assistant",
    },
    {
      id: "2",
      title: "Video Library",
      description: "Search and watch educational videos on any topic",
      icon: "📺",
      color: "#03DAC6",
      action: "videos",
    },
  ];

  const handleAIFeaturePress = (action) => {
    if (action === "assistant") {
      navigation.navigate("Chatbot");
    } else if (action === "videos") {
      navigation.navigate("Chatbot");
      // You could pass params to open videos tab directly
    }
  };

  const handleSubjectPress = (subject) => {
    if (subject.name === "Sign Language") {
      navigation.navigate("SignLanguage");
    } else {
      navigation.navigate("SubjectDetails", {
        subject,
        grade: user?.grade || "12",
      });
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          📚 Study Materials
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Grade {user?.grade || "12"}
        </Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* AI Features Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              🤖 AI-Powered Learning
            </Text>
            <Text
              style={[styles.sectionSubtitle, { color: theme.textSecondary }]}
            >
              Get instant help with your studies
            </Text>
          </View>

          <View style={styles.aiFeaturesList}>
            {aiFeatures.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={[
                  styles.aiFeatureCard,
                  {
                    backgroundColor: theme.surface,
                    borderLeftColor: feature.color,
                  },
                ]}
                onPress={() => handleAIFeaturePress(feature.action)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.aiFeatureIcon,
                    { backgroundColor: feature.color + "20" },
                  ]}
                >
                  <Text style={styles.aiFeatureIconText}>{feature.icon}</Text>
                </View>
                <View style={styles.aiFeatureInfo}>
                  <Text style={[styles.aiFeatureTitle, { color: theme.text }]}>
                    {feature.title}
                  </Text>
                  <Text
                    style={[
                      styles.aiFeatureDescription,
                      { color: theme.textSecondary },
                    ]}
                  >
                    {feature.description}
                  </Text>
                </View>
                <Text style={[styles.arrowIcon, { color: feature.color }]}>
                  →
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Access Banner */}
        <TouchableOpacity
          style={[styles.quickAccessBanner, { backgroundColor: "#6200EE" }]}
          onPress={() => navigation.navigate("Chatbot")}
        >
          <View style={styles.bannerContent}>
            <Text style={styles.bannerIcon}>🎓</Text>
            <View style={styles.bannerText}>
              <Text style={styles.bannerTitle}>Need Help Now?</Text>
              <Text style={styles.bannerSubtitle}>
                Ask our AI assistant anything!
              </Text>
            </View>
          </View>
          <View style={styles.bannerButton}>
            <Text style={styles.bannerButtonText}>Ask AI →</Text>
          </View>
        </TouchableOpacity>

        {/* Subjects Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              📖 Subjects
            </Text>
            <Text
              style={[styles.sectionSubtitle, { color: theme.textSecondary }]}
            >
              Browse study materials by subject
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
                    borderColor: subject.color,
                  },
                ]}
                onPress={() => handleSubjectPress(subject)}
              >
                <Text style={styles.subjectIcon}>{subject.icon}</Text>
                <Text style={[styles.subjectName, { color: theme.text }]}>
                  {subject.name}
                </Text>
                <View
                  style={[
                    styles.subjectIndicator,
                    { backgroundColor: subject.color },
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Study Tips Card */}
        <View style={[styles.tipsCard, { backgroundColor: theme.surface }]}>
          <Text style={styles.tipsIcon}>💡</Text>
          <Text style={[styles.tipsTitle, { color: theme.text }]}>
            Study Tip of the Day
          </Text>
          <Text style={[styles.tipsText, { color: theme.textSecondary }]}>
            Use the AI assistant to explain difficult concepts in simpler terms.
            Don't hesitate to ask follow-up questions!
          </Text>
        </View>
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
    paddingBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionSubtitle: {
    fontSize: 14,
  },
  aiFeaturesList: {
    gap: 15,
  },
  aiFeatureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  aiFeatureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  aiFeatureIconText: {
    fontSize: 28,
  },
  aiFeatureInfo: {
    flex: 1,
  },
  aiFeatureTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  aiFeatureDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  arrowIcon: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  quickAccessBanner: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  bannerIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  bannerText: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#ffffff99",
  },
  bannerButton: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  bannerButtonText: {
    color: "#6200EE",
    fontSize: 16,
    fontWeight: "bold",
  },
  subjectsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  subjectCard: {
    width: "48%",
    padding: 20,
    borderRadius: 16,
    marginBottom: 15,
    alignItems: "center",
    borderWidth: 2,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  subjectIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  subjectName: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  subjectIndicator: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  tipsCard: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    marginBottom: 30,
  },
  tipsIcon: {
    fontSize: 32,
    marginBottom: 10,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  tipsText: {
    fontSize: 15,
    lineHeight: 22,
  },
});
