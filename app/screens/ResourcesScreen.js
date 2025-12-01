import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function ResourcesScreen({ navigation }) {
  const { theme } = useTheme();

  const openURL = async (url) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error", "Cannot open this URL");
      }
    } catch (error) {
      console.error("Error opening URL:", error);
      Alert.alert("Error", "Failed to open link");
    }
  };

  const resources = [
    {
      id: 1,
      title: "Study Guides",
      icon: "📖",
      description: "Comprehensive study materials for all subjects",
      color: "#4CAF50",
      onPress: () => {
        Alert.alert(
          "Study Guides",
          "Choose your subject:",
          [
            {
              text: "Mathematics",
              onPress: () =>
                navigation.navigate("StudyGuideContent", {
                  subject: "Mathematics",
                }),
            },
            {
              text: "Physical Sciences",
              onPress: () =>
                navigation.navigate("StudyGuideContent", {
                  subject: "Physical Sciences",
                }),
            },
            {
              text: "Life Sciences",
              onPress: () =>
                navigation.navigate("StudyGuideContent", {
                  subject: "Life Sciences",
                }),
            },
            { text: "Cancel", style: "cancel" },
          ],
          { cancelable: true }
        );
      },
    },
    {
      id: 2,
      title: "Past Papers",
      icon: "📄",
      description: "Previous exam papers and memorandums",
      color: "#2196F3",
      onPress: () =>
        openURL(
          "https://www.education.gov.za/Curriculum/NationalSeniorCertificate(NSC)Examinations/NSCPastExaminationpapers.aspx"
        ),
    },
    {
      id: 3,
      title: "Video Lessons",
      icon: "🎥",
      description: "Educational videos and tutorials",
      color: "#F44336",
      onPress: () => openURL("https://www.youtube.com/@Mindset_Learn"),
    },
    {
      id: 4,
      title: "Calculator",
      icon: "🔢",
      description: "Scientific calculator for complex calculations",
      color: "#FF9800",
      onPress: () => {
        Alert.alert(
          "Calculator",
          "Opening calculator app...",
          [
            {
              text: "OK",
              onPress: () => {
                // On Android, you can use Linking to open calculator
                Linking.openURL("calculator://").catch(() => {
                  Alert.alert(
                    "Note",
                    "Please use your device's built-in calculator app"
                  );
                });
              },
            },
          ],
          { cancelable: true }
        );
      },
    },
    {
      id: 5,
      title: "Sign Language",
      icon: "🤟",
      description: "Learn South African Sign Language basics",
      color: "#9C27B0",
      onPress: () => navigation.navigate("SignLanguage"),
    },
    {
      id: 6,
      title: "Study Tips",
      icon: "💡",
      description: "Effective learning strategies and techniques",
      color: "#00BCD4",
      onPress: () => {
        Alert.alert(
          "Study Tips & Techniques",
          "📚 Effective Study Methods:\n\n" +
            "1. **Pomodoro Technique**\n" +
            "   • Study for 25 minutes\n" +
            "   • Take 5-minute break\n" +
            "   • Repeat 4 times\n" +
            "   • Take longer break\n\n" +
            "2. **Active Recall**\n" +
            "   • Test yourself regularly\n" +
            "   • Don't just re-read notes\n" +
            "   • Use flashcards\n" +
            "   • Practice past papers\n\n" +
            "3. **Spaced Repetition**\n" +
            "   • Review after 1 day\n" +
            "   • Review after 3 days\n" +
            "   • Review after 1 week\n" +
            "   • Review after 1 month\n\n" +
            "4. **Mind Mapping**\n" +
            "   • Visual organization\n" +
            "   • Connect concepts\n" +
            "   • Use colors and images\n" +
            "   • Better memory retention\n\n" +
            "5. **Teach Others**\n" +
            "   • Explain concepts aloud\n" +
            "   • Form study groups\n" +
            "   • Identify knowledge gaps\n" +
            "   • Reinforce understanding\n\n" +
            "💪 Stay consistent and believe in yourself!"
        );
      },
    },
    {
      id: 7,
      title: "Online Libraries",
      icon: "📚",
      description: "Access free educational resources",
      color: "#795548",
      onPress: () => openURL("https://www.sapretoria.co.za/"),
    },
    {
      id: 8,
      title: "Career Guidance",
      icon: "🎯",
      description: "Explore career paths and requirements",
      color: "#607D8B",
      onPress: () => openURL("https://www.careerhelp.org.za/"),
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Resources</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Access study materials and tools
        </Text>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {resources.map((resource) => (
          <TouchableOpacity
            key={resource.id}
            style={[
              styles.resourceCard,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
            onPress={resource.onPress}
          >
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: resource.color },
              ]}
            >
              <Text style={styles.icon}>{resource.icon}</Text>
            </View>
            <View style={styles.resourceInfo}>
              <Text style={[styles.resourceTitle, { color: theme.text }]}>
                {resource.title}
              </Text>
              <Text
                style={[
                  styles.resourceDescription,
                  { color: theme.textSecondary },
                ]}
              >
                {resource.description}
              </Text>
            </View>
            <Text style={[styles.arrow, { color: theme.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>
        ))}
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
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingTop: 10,
  },
  resourceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 28,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  resourceDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  arrow: {
    fontSize: 24,
    fontWeight: "300",
    marginLeft: 8,
  },
});
