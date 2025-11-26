import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function LearningMaterialsScreen({ navigation, route }) {
  const { subject, grade } = route.params || {};
  const { theme } = useTheme();
  const [selectedTab, setSelectedTab] = useState("pastPapers");

  const learningMaterials = {
    pastPapers: [
      {
        id: 1,
        title: `Grade ${grade} ${subject?.name} - June 2024`,
        type: "Exam Paper",
        size: "2.5 MB",
        year: 2024,
        term: "June",
        icon: "📄",
      },
      {
        id: 2,
        title: `Grade ${grade} ${subject?.name} - November 2023`,
        type: "Exam Paper",
        size: "2.8 MB",
        year: 2023,
        term: "November",
        icon: "📄",
      },
      {
        id: 3,
        title: `Grade ${grade} ${subject?.name} - June 2023`,
        type: "Exam Paper",
        size: "2.3 MB",
        year: 2023,
        term: "June",
        icon: "📄",
      },
      {
        id: 4,
        title: `Grade ${grade} ${subject?.name} - November 2022`,
        type: "Exam Paper",
        size: "2.6 MB",
        year: 2022,
        term: "November",
        icon: "📄",
      },
      {
        id: 5,
        title: `Grade ${grade} ${subject?.name} - June 2022`,
        type: "Exam Paper",
        size: "2.4 MB",
        year: 2022,
        term: "June",
        icon: "📄",
      },
    ],
    memos: [
      {
        id: 1,
        title: `Grade ${grade} ${subject?.name} - June 2024 Memo`,
        type: "Memorandum",
        size: "1.8 MB",
        year: 2024,
        term: "June",
        icon: "📋",
      },
      {
        id: 2,
        title: `Grade ${grade} ${subject?.name} - November 2023 Memo`,
        type: "Memorandum",
        size: "2.0 MB",
        year: 2023,
        term: "November",
        icon: "📋",
      },
      {
        id: 3,
        title: `Grade ${grade} ${subject?.name} - June 2023 Memo`,
        type: "Memorandum",
        size: "1.7 MB",
        year: 2023,
        term: "June",
        icon: "📋",
      },
    ],
    studyGuides: [
      {
        id: 1,
        title: `${subject?.name} Complete Study Guide - Grade ${grade}`,
        type: "Study Guide",
        size: "5.2 MB",
        pages: 120,
        icon: "📚",
        topics: "All Topics Covered",
      },
      {
        id: 2,
        title: `${subject?.name} Quick Reference Guide`,
        type: "Reference Guide",
        size: "1.5 MB",
        pages: 25,
        icon: "📖",
        topics: "Key Concepts & Formulas",
      },
      {
        id: 3,
        title: `${subject?.name} Exam Tips & Strategies`,
        type: "Study Tips",
        size: "0.8 MB",
        pages: 15,
        icon: "💡",
        topics: "Exam Preparation",
      },
    ],
    videos: [
      {
        id: 1,
        title: `${subject?.name} - Introduction & Fundamentals`,
        type: "Video Lesson",
        duration: "45:30",
        views: "15.2K",
        icon: "🎥",
        level: "Beginner",
      },
      {
        id: 2,
        title: `${subject?.name} - Advanced Concepts`,
        type: "Video Lesson",
        duration: "52:15",
        views: "12.8K",
        icon: "🎥",
        level: "Advanced",
      },
    ],
    notes: [
      {
        id: 1,
        title: `${subject?.name} Chapter 1 Notes`,
        type: "Chapter Notes",
        size: "1.2 MB",
        pages: 18,
        icon: "📄",
        chapter: "Chapter 1",
      },
      {
        id: 2,
        title: `${subject?.name} Chapter 2 Notes`,
        type: "Chapter Notes",
        size: "1.5 MB",
        pages: 22,
        icon: "📄",
        chapter: "Chapter 2",
      },
    ],
  };

  const tabs = [
    { id: "pastPapers", label: "Past Papers", icon: "📄" },
    { id: "memos", label: "Memos", icon: "📋" },
    { id: "studyGuides", label: "Study Guides", icon: "📚" },
    { id: "videos", label: "Videos", icon: "🎥" },
    { id: "notes", label: "Notes", icon: "📝" },
  ];

  const handleDownload = (item) => {
    Alert.alert(
      "Download",
      `"${item.title}" will be available for download soon!`,
      [{ text: "OK" }]
    );
  };

  const handleViewOnline = (item) => {
    if (selectedTab === "videos") {
      Alert.alert(
        "Watch Video",
        `"${item.title}" will open in video player soon!`,
        [{ text: "OK" }]
      );
    } else {
      Alert.alert(
        "View Document",
        `"${item.title}" will open in document viewer soon!`,
        [{ text: "OK" }]
      );
    }
  };

  const renderMaterialCard = (item) => {
    return (
      <View
        key={item.id}
        style={[
          styles.materialCard,
          { backgroundColor: theme.surface, borderColor: theme.border },
        ]}
      >
        <View style={styles.materialHeader}>
          <Text style={styles.materialIcon}>{item.icon}</Text>
          <View style={styles.materialInfo}>
            <Text style={[styles.materialTitle, { color: theme.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.materialType, { color: theme.textSecondary }]}>
              {item.type}
            </Text>
          </View>
        </View>

        <View style={styles.materialMeta}>
          {item.size && (
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>
                Size: {item.size}
              </Text>
            </View>
          )}
          {item.pages && (
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>
                {item.pages} pages
              </Text>
            </View>
          )}
          {item.duration && (
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>
                ⏱️ {item.duration}
              </Text>
            </View>
          )}
          {item.views && (
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>
                👁️ {item.views} views
              </Text>
            </View>
          )}
          {item.year && (
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.textSecondary }]}>
                📅 {item.term} {item.year}
              </Text>
            </View>
          )}
          {item.level && (
            <View style={styles.metaItem}>
              <Text style={[styles.metaLabel, { color: theme.primary }]}>
                📊 {item.level}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.materialActions}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.viewButton,
              { backgroundColor: theme.primary },
            ]}
            onPress={() => handleViewOnline(item)}
          >
            <Text style={styles.actionButtonText}>
              {selectedTab === "videos" ? "▶️ Watch" : "👁️ View"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.actionButton,
              styles.downloadButton,
              { backgroundColor: theme.surface, borderColor: theme.primary },
            ]}
            onPress={() => handleDownload(item)}
          >
            <Text style={[styles.downloadButtonText, { color: theme.primary }]}>
              ⬇️ Download
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.subjectIcon}>{subject?.icon}</Text>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            {subject?.name}
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Grade {grade} Learning Materials
          </Text>
        </View>
      </View>

      <View style={[styles.tabsContainer, { backgroundColor: theme.surface }]}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsContent}
        >
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                {
                  backgroundColor:
                    selectedTab === tab.id ? theme.primary : "transparent",
                  borderColor: theme.border,
                },
              ]}
              onPress={() => setSelectedTab(tab.id)}
            >
              <Text style={styles.tabIcon}>{tab.icon}</Text>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    color: selectedTab === tab.id ? "#fff" : theme.text,
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.materialsContainer}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            {tabs.find((t) => t.id === selectedTab)?.label}
          </Text>
          <Text style={[styles.sectionCount, { color: theme.textSecondary }]}>
            {learningMaterials[selectedTab].length} items available
          </Text>

          {learningMaterials[selectedTab].map(renderMaterialCard)}
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.quickAction, { backgroundColor: theme.primary }]}
          onPress={() =>
            navigation.navigate("TopicQuestions", { subject, grade })
          }
        >
          <Text style={styles.quickActionText}>📝 Practice Tests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickAction, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("Chatbot")}
        >
          <Text style={styles.quickActionText}>🤖 AI Tutor</Text>
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
    paddingBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerContent: {
    alignItems: "center",
  },
  subjectIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  tabsContainer: {
    paddingVertical: 10,
    elevation: 2,
  },
  tabsContent: {
    paddingHorizontal: 15,
    gap: 10,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  tabIcon: {
    fontSize: 18,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  materialsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sectionCount: {
    fontSize: 14,
    marginBottom: 20,
  },
  materialCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  materialHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  materialIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  materialInfo: {
    flex: 1,
  },
  materialTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 22,
  },
  materialType: {
    fontSize: 14,
  },
  materialMeta: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaLabel: {
    fontSize: 12,
  },
  materialActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  viewButton: {
    elevation: 2,
  },
  downloadButton: {
    borderWidth: 2,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  downloadButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    padding: 15,
    gap: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickAction: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    elevation: 2,
  },
  quickActionText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});
