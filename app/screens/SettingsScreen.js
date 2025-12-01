import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  const { logout } = useContext(AuthContext);
  const { theme, isDarkMode, toggleTheme } = useTheme();

  // Notification settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);
  const [progressUpdates, setProgressUpdates] = useState(true);

  // Privacy settings
  const [shareProgress, setShareProgress] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  const handleClearCache = async () => {
    Alert.alert("Clear Cache", "This will clear all cached data. Continue?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          try {
            // Clear specific cache items (not user data)
            await AsyncStorage.removeItem("cached_questions");
            await AsyncStorage.removeItem("cached_resources");
            Alert.alert("Success", "Cache cleared successfully!");
          } catch (error) {
            Alert.alert("Error", "Failed to clear cache");
          }
        },
      },
    ]);
  };

  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert("Error", "Cannot open this URL");
    }
  };

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "Choose your preferred method:", [
      {
        text: "Email",
        onPress: () => openURL("mailto:support@edulearnza.co.za"),
      },
      {
        text: "WhatsApp",
        onPress: () => openURL("https://wa.me/27123456789"),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleReportBug = () => {
    Alert.alert(
      "Report a Bug",
      "Please describe the issue you're experiencing:",
      [
        {
          text: "Send Email",
          onPress: () =>
            openURL("mailto:bugs@edulearnza.co.za?subject=Bug Report"),
        },
        { text: "Cancel", style: "cancel" },
      ]
    );
  };

  const handleRequestFeature = () => {
    Alert.alert("Request Feature", "Share your feature ideas with us:", [
      {
        text: "Send Email",
        onPress: () =>
          openURL("mailto:feedback@edulearnza.co.za?subject=Feature Request"),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const settingSections = [
    {
      title: "Account",
      items: [
        {
          icon: "👤",
          label: "Edit Profile",
          onPress: () => navigation.navigate("EditProfile"),
        },
        {
          icon: "🌙",
          label: "Dark Mode",
          hasSwitch: true,
          value: isDarkMode,
          onToggle: toggleTheme,
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: "🔔",
          label: "Push Notifications",
          hasSwitch: true,
          value: pushNotifications,
          onToggle: setPushNotifications,
        },
        {
          icon: "📧",
          label: "Email Notifications",
          hasSwitch: true,
          value: emailNotifications,
          onToggle: setEmailNotifications,
        },
        {
          icon: "⏰",
          label: "Study Reminders",
          hasSwitch: true,
          value: studyReminders,
          onToggle: setStudyReminders,
        },
        {
          icon: "📊",
          label: "Progress Updates",
          hasSwitch: true,
          value: progressUpdates,
          onToggle: setProgressUpdates,
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          icon: "🔒",
          label: "Share My Progress",
          subtitle: "Allow others to see your learning progress",
          hasSwitch: true,
          value: shareProgress,
          onToggle: setShareProgress,
        },
        {
          icon: "👁️",
          label: "Profile Visibility",
          subtitle: "Make your profile visible to other students",
          hasSwitch: true,
          value: profileVisibility,
          onToggle: setProfileVisibility,
        },
        {
          icon: "📄",
          label: "Privacy Policy",
          onPress: () =>
            Alert.alert(
              "Privacy Policy",
              "We respect your privacy and are committed to protecting your personal data.\n\n" +
                "• We collect only necessary information\n" +
                "• Your data is encrypted and secure\n" +
                "• We never share your data with third parties\n" +
                "• You can delete your account anytime\n\n" +
                "For full details, visit our website."
            ),
        },
        {
          icon: "📋",
          label: "Terms of Service",
          onPress: () =>
            Alert.alert(
              "Terms of Service",
              "By using EduLearnZA, you agree to:\n\n" +
                "• Use the app for educational purposes\n" +
                "• Respect other users and content\n" +
                "• Not share your account credentials\n" +
                "• Follow community guidelines\n\n" +
                "For full terms, visit our website."
            ),
        },
        {
          icon: "🛡️",
          label: "Data & Security",
          onPress: () =>
            Alert.alert(
              "Data & Security",
              "Your data security is our priority:\n\n" +
                "✓ End-to-end encryption\n" +
                "✓ Secure cloud storage\n" +
                "✓ Regular security audits\n" +
                "✓ Two-factor authentication available\n" +
                "✓ Automatic data backup\n\n" +
                "Your information is safe with us."
            ),
        },
      ],
    },
    {
      title: "Help & Support",
      items: [
        {
          icon: "❓",
          label: "FAQ",
          onPress: () =>
            Alert.alert(
              "Frequently Asked Questions",
              "Q: How do I reset my progress?\n" +
                "A: Go to Settings > Account > Reset Progress\n\n" +
                "Q: Can I use offline?\n" +
                "A: Yes! Questions are cached for offline use\n\n" +
                "Q: How do I change my grade?\n" +
                "A: Edit your profile and select your grade\n\n" +
                "Q: Are there video lessons?\n" +
                "A: Yes, check the Resources section\n\n" +
                "Need more help? Contact support!"
            ),
        },
        {
          icon: "📞",
          label: "Contact Support",
          subtitle: "Email or WhatsApp us",
          onPress: handleContactSupport,
        },
        {
          icon: "🐛",
          label: "Report a Bug",
          subtitle: "Help us improve the app",
          onPress: handleReportBug,
        },
        {
          icon: "💡",
          label: "Request Feature",
          subtitle: "Share your ideas with us",
          onPress: handleRequestFeature,
        },
        {
          icon: "📖",
          label: "User Guide",
          onPress: () =>
            Alert.alert(
              "User Guide",
              "📚 Getting Started:\n" +
                "1. Complete your profile\n" +
                "2. Choose your subjects\n" +
                "3. Start practicing!\n\n" +
                "🎯 Features:\n" +
                "• Practice quizzes\n" +
                "• Progress tracking\n" +
                "• Study resources\n" +
                "• Sign language learning\n" +
                "• Past papers\n\n" +
                "💪 Tips:\n" +
                "• Study daily for best results\n" +
                "• Track your progress\n" +
                "• Use resources regularly"
            ),
        },
        {
          icon: "ℹ️",
          label: "About EduLearnZA",
          onPress: () =>
            Alert.alert(
              "About EduLearnZA",
              "Version 1.0.0\n\n" +
                "EduLearnZA is a comprehensive learning platform for South African students (Grades 8-12).\n\n" +
                "Features:\n" +
                "• 100+ practice questions per subject\n" +
                "• Progress tracking\n" +
                "• Past exam papers\n" +
                "• Study resources\n" +
                "• Sign language learning\n" +
                "• Offline mode\n\n" +
                "© 2024 EduLearnZA. All rights reserved."
            ),
        },
      ],
    },
    {
      title: "Data",
      items: [
        {
          icon: "🗑️",
          label: "Clear Cache",
          subtitle: "Free up storage space",
          onPress: handleClearCache,
        },
      ],
    },
    {
      title: "Account Actions",
      items: [
        {
          icon: "🚪",
          label: "Logout",
          onPress: handleLogout,
          danger: true,
        },
      ],
    },
  ];

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
          Settings
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>
              {section.title}
            </Text>
            <View
              style={[
                styles.sectionContent,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  style={[
                    styles.settingItem,
                    itemIndex < section.items.length - 1 && {
                      borderBottomWidth: 1,
                      borderBottomColor: theme.border,
                    },
                  ]}
                  onPress={item.hasSwitch ? null : item.onPress}
                  disabled={item.hasSwitch}
                >
                  <View style={styles.settingLeft}>
                    <Text style={styles.settingIcon}>{item.icon}</Text>
                    <View style={styles.settingTextContainer}>
                      <Text
                        style={[
                          styles.settingLabel,
                          { color: item.danger ? "#F44336" : theme.text },
                        ]}
                      >
                        {item.label}
                      </Text>
                      {item.subtitle && (
                        <Text
                          style={[
                            styles.settingSubtitle,
                            { color: theme.textSecondary },
                          ]}
                        >
                          {item.subtitle}
                        </Text>
                      )}
                    </View>
                  </View>
                  {item.hasSwitch ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: "#767577", true: theme.primary }}
                      thumbColor={item.value ? "#FFF" : "#f4f3f4"}
                    />
                  ) : (
                    <Text
                      style={[styles.arrow, { color: theme.textSecondary }]}
                    >
                      →
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            EduLearnZA v1.0.0
          </Text>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Made with ❤️ for SA Students
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
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  sectionContent: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    fontWeight: "300",
  },
  footer: {
    alignItems: "center",
    padding: 30,
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    marginBottom: 5,
  },
});
