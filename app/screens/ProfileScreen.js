import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Switch,
  Linking,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import axios from "axios";

const API_URL = "http://192.168.1.100:5000";

// Create axios instance with custom config
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);

  // Notification settings
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [studyReminders, setStudyReminders] = useState(true);

  // Privacy settings
  const [shareProgress, setShareProgress] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState(true);

  useEffect(() => {
    if (!user) {
      navigation.replace("Login");
    }
  }, [user]);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            navigation.replace("Login");
          } catch (error) {
            console.error("Logout error:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

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

  const handleContactSupport = () => {
    Alert.alert("Contact Support", "Choose your preferred method:", [
      {
        text: "Email",
        onPress: () => openURL("mailto:lethusithole7@gmail.com"),
      },
      {
        text: "WhatsApp",
        onPress: () => openURL("https://wa.me/27694905342"),
      },
      {
        text: "Call",
        onPress: () => openURL("tel:+27694905342"),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const handleReportBug = () => {
    Alert.alert("Report a Bug", "Please describe the issue:", [
      {
        text: "Send Email",
        onPress: () =>
          openURL(
            "mailto:lethusithole7@gmail.com?subject=Bug Report - EduLearnZA"
          ),
      },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const getPhotoUrl = () => {
    if (!user?.profilePhoto) return null;

    if (user.profilePhoto.startsWith("http")) {
      return user.profilePhoto;
    }
    return `${API_URL}${user.profilePhoto}`;
  };

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: "✏️",
          label: "Edit Profile",
          onPress: () => navigation.navigate("EditProfile"),
        },
      ],
    },
    {
      title: "Notifications",
      items: [
        {
          icon: "🔔",
          label: "Push Notifications",
          subtitle: "Get notified about updates",
          hasSwitch: true,
          value: pushNotifications,
          onToggle: setPushNotifications,
        },
        {
          icon: "📧",
          label: "Email Notifications",
          subtitle: "Receive emails about progress",
          hasSwitch: true,
          value: emailNotifications,
          onToggle: setEmailNotifications,
        },
        {
          icon: "⏰",
          label: "Study Reminders",
          subtitle: "Daily study time reminders",
          hasSwitch: true,
          value: studyReminders,
          onToggle: setStudyReminders,
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          icon: "🔒",
          label: "Share My Progress",
          subtitle: "Let others see your achievements",
          hasSwitch: true,
          value: shareProgress,
          onToggle: setShareProgress,
        },
        {
          icon: "👁️",
          label: "Profile Visibility",
          subtitle: "Make profile visible to students",
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
              "We respect your privacy and protect your data.\n\n" +
                "• Only necessary information collected\n" +
                "• Data encrypted and secure\n" +
                "• No third-party sharing\n" +
                "• Delete account anytime\n\n" +
                "Visit our website for full details."
            ),
        },
        {
          icon: "📋",
          label: "Terms of Service",
          onPress: () =>
            Alert.alert(
              "Terms of Service",
              "By using EduLearnZA:\n\n" +
                "• Use for educational purposes\n" +
                "• Respect other users\n" +
                "• Keep credentials secure\n" +
                "• Follow community guidelines\n\n" +
                "Visit website for full terms."
            ),
        },
        {
          icon: "🛡️",
          label: "Data & Security",
          onPress: () =>
            Alert.alert(
              "Data & Security",
              "Your security matters:\n\n" +
                "✓ End-to-end encryption\n" +
                "✓ Secure cloud storage\n" +
                "✓ Regular security audits\n" +
                "✓ Two-factor authentication\n" +
                "✓ Automatic backups\n\n" +
                "Your data is safe with us."
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
              "Q: How to reset progress?\n" +
                "A: Settings > Account > Reset Progress\n\n" +
                "Q: Can I use offline?\n" +
                "A: Yes! Questions cached for offline use\n\n" +
                "Q: How to change grade?\n" +
                "A: Edit Profile and select your grade\n\n" +
                "Q: Are there video lessons?\n" +
                "A: Yes, check Resources section\n\n" +
                "Need more help? Contact support!"
            ),
        },
        {
          icon: "📞",
          label: "Contact Support",
          subtitle: "Email, WhatsApp or Call",
          onPress: handleContactSupport,
        },
        {
          icon: "🐛",
          label: "Report a Bug",
          subtitle: "Help us improve",
          onPress: handleReportBug,
        },
        {
          icon: "💡",
          label: "Request Feature",
          subtitle: "Share your ideas",
          onPress: () =>
            openURL(
              "mailto:lethusithole7@gmail.com?subject=Feature Request - EduLearnZA"
            ),
        },
        {
          icon: "📖",
          label: "User Guide",
          onPress: () =>
            Alert.alert(
              "User Guide",
              "📚 Getting Started:\n" +
                "1. Complete your profile\n" +
                "2. Choose subjects\n" +
                "3. Start practicing!\n\n" +
                "🎯 Features:\n" +
                "• Practice quizzes\n" +
                "• Progress tracking\n" +
                "• Study resources\n" +
                "• Sign language\n" +
                "• Past papers\n\n" +
                "💪 Tips:\n" +
                "• Study daily\n" +
                "• Track progress\n" +
                "• Use resources"
            ),
        },
        {
          icon: "ℹ️",
          label: "About EduLearnZA",
          onPress: () =>
            Alert.alert(
              "About EduLearnZA",
              "Version 1.0.0\n\n" +
                "Comprehensive learning platform for SA students (Grades 8-12).\n\n" +
                "Features:\n" +
                "• 100+ practice questions\n" +
                "• Progress tracking\n" +
                "• Past exam papers\n" +
                "• Study resources\n" +
                "• Sign language learning\n" +
                "• Offline mode\n\n" +
                "Contact: lethusithole7@gmail.com\n" +
                "Phone: 069 490 5342\n\n" +
                "© 2024 EduLearnZA"
            ),
        },
      ],
    },
    {
      title: "Actions",
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

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Loading profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView
        style={[styles.container, { backgroundColor: theme.background }]}
      >
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={[styles.errorText, { color: theme.text }]}>
            Please login to view your profile
          </Text>
          <TouchableOpacity
            style={[styles.loginButton, { backgroundColor: theme.primary }]}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.loginButtonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView>
        {/* Profile Header */}
        <View
          style={[
            styles.profileHeader,
            { backgroundColor: theme.surface, borderColor: theme.border },
          ]}
        >
          <View style={styles.profileImageContainer}>
            {getPhotoUrl() ? (
              <Image
                source={{ uri: getPhotoUrl() }}
                style={styles.profileImage}
                onError={(e) => {
                  console.log("Image load error:", e.nativeEvent.error);
                }}
              />
            ) : (
              <View
                style={[
                  styles.profileImagePlaceholder,
                  { backgroundColor: theme.primary },
                ]}
              >
                <Text style={styles.profileImageText}>
                  {user?.name?.charAt(0).toUpperCase() || "?"}
                </Text>
              </View>
            )}
          </View>
          <Text style={[styles.userName, { color: theme.text }]}>
            {user?.name || "User"}
          </Text>
          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
            {user?.email || ""}
          </Text>
          <View style={styles.userInfoRow}>
            <View style={styles.userInfoItem}>
              <Text
                style={[styles.userInfoLabel, { color: theme.textSecondary }]}
              >
                Grade
              </Text>
              <Text style={[styles.userInfoValue, { color: theme.text }]}>
                {user?.grade || "N/A"}
              </Text>
            </View>
            <View style={styles.userInfoItem}>
              <Text
                style={[styles.userInfoLabel, { color: theme.textSecondary }]}
              >
                Subjects
              </Text>
              <Text style={[styles.userInfoValue, { color: theme.text }]}>
                {user?.subjects?.length || 0}
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.menuContainer}>
          {menuSections.map((section, sectionIndex) => (
            <View key={sectionIndex} style={styles.menuSection}>
              <Text
                style={[styles.sectionTitle, { color: theme.textSecondary }]}
              >
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
                      styles.menuItem,
                      itemIndex < section.items.length - 1 && {
                        borderBottomWidth: 1,
                        borderBottomColor: theme.border,
                      },
                    ]}
                    onPress={item.hasSwitch ? null : item.onPress}
                    disabled={item.hasSwitch}
                  >
                    <View style={styles.menuItemLeft}>
                      <Text style={styles.menuIcon}>{item.icon}</Text>
                      <View style={styles.menuTextContainer}>
                        <Text
                          style={[
                            styles.menuLabel,
                            { color: item.danger ? "#F44336" : theme.text },
                          ]}
                        >
                          {item.label}
                        </Text>
                        {item.subtitle && (
                          <Text
                            style={[
                              styles.menuSubtitle,
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
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            EduLearnZA v1.0.0
          </Text>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Developed by Lethu_M
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
  },
  loginButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  profileHeader: {
    padding: 30,
    alignItems: "center",
    borderBottomWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  profileImageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImageText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#FFF",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 20,
  },
  userInfoRow: {
    flexDirection: "row",
    gap: 40,
  },
  userInfoItem: {
    alignItems: "center",
  },
  userInfoLabel: {
    fontSize: 12,
    marginBottom: 5,
  },
  userInfoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  menuContainer: {
    padding: 20,
  },
  menuSection: {
    marginBottom: 20,
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
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  menuSubtitle: {
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
    marginTop: 10,
  },
  footerText: {
    fontSize: 12,
    marginBottom: 5,
  },
});
