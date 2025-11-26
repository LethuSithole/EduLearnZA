import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { CommonActions } from "@react-navigation/native";

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const { theme, isDarkMode, toggleTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await logout();
              // Reset navigation stack to Welcome screen
              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: "Welcome" }],
                })
              );
            } catch (error) {
              console.error("Logout error:", error);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const handleChangePassword = () => {
    Alert.alert("Change Password", "This feature is coming soon!");
  };

  const handleNotifications = () => {
    Alert.alert("Notifications", "This feature is coming soon!");
  };

  const handlePrivacy = () => {
    Alert.alert("Privacy Settings", "This feature is coming soon!");
  };

  const handleHelp = () => {
    Alert.alert("Help & Support", "This feature is coming soon!");
  };

  const handleAbout = () => {
    Alert.alert(
      "About EduLearnZA",
      "Version 1.0.0\n\nA comprehensive educational platform for South African students.\n\nDeveloped by Lethu_M\n© 2024 EduLearnZA. All rights reserved."
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <View
            style={[styles.avatarContainer, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.avatarText}>
              {user?.displayName?.charAt(0)?.toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={[styles.userName, { color: theme.text }]}>
            {user?.displayName || "Student"}
          </Text>
          <Text style={[styles.userEmail, { color: theme.textSecondary }]}>
            {user?.email || "student@edulearnza.com"}
          </Text>
          <Text style={[styles.userGrade, { color: theme.textSecondary }]}>
            Grade {user?.grade || "12"}
          </Text>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Account Settings
          </Text>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
            onPress={handleEditProfile}
          >
            <Text style={styles.menuIcon}>👤</Text>
            <Text style={[styles.menuText, { color: theme.text }]}>
              Edit Profile
            </Text>
            <Text style={[styles.menuArrow, { color: theme.textSecondary }]}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
            onPress={handleChangePassword}
          >
            <Text style={styles.menuIcon}>🔒</Text>
            <Text style={[styles.menuText, { color: theme.text }]}>
              Change Password
            </Text>
            <Text style={[styles.menuArrow, { color: theme.textSecondary }]}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
            onPress={handleNotifications}
          >
            <Text style={styles.menuIcon}>🔔</Text>
            <Text style={[styles.menuText, { color: theme.text }]}>
              Notifications
            </Text>
            <Text style={[styles.menuArrow, { color: theme.textSecondary }]}>
              ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            App Settings
          </Text>

          <View style={[styles.menuItem, { backgroundColor: theme.surface }]}>
            <Text style={styles.menuIcon}>🌙</Text>
            <Text style={[styles.menuText, { color: theme.text }]}>
              Dark Mode
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: theme.primary }}
              thumbColor={isDarkMode ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
            onPress={handlePrivacy}
          >
            <Text style={styles.menuIcon}>🔐</Text>
            <Text style={[styles.menuText, { color: theme.text }]}>
              Privacy & Security
            </Text>
            <Text style={[styles.menuArrow, { color: theme.textSecondary }]}>
              ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* Support */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Support
          </Text>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
            onPress={handleHelp}
          >
            <Text style={styles.menuIcon}>❓</Text>
            <Text style={[styles.menuText, { color: theme.text }]}>
              Help & Support
            </Text>
            <Text style={[styles.menuArrow, { color: theme.textSecondary }]}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
            onPress={handleAbout}
          >
            <Text style={styles.menuIcon}>ℹ️</Text>
            <Text style={[styles.menuText, { color: theme.text }]}>About</Text>
            <Text style={[styles.menuArrow, { color: theme.textSecondary }]}>
              ›
            </Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: "#FF6B6B" }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Copyright Footer */}
        <View style={styles.footer}>
          <Text style={[styles.copyrightText, { color: theme.textSecondary }]}>
            © {new Date().getFullYear()} EduLearnZA
          </Text>
          <Text style={[styles.copyrightText, { color: theme.textSecondary }]}>
            All rights reserved
          </Text>
          <View style={styles.developerContainer}>
            <Text
              style={[styles.developedByText, { color: theme.textSecondary }]}
            >
              Developed by{" "}
            </Text>
            <Text style={[styles.developerName, { color: theme.primary }]}>
              Lethu_M
            </Text>
          </View>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>
            Version 1.0.0
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
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 30,
    marginBottom: 20,
    elevation: 2,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    elevation: 4,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 5,
  },
  userGrade: {
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
  },
  menuArrow: {
    fontSize: 24,
  },
  logoutButton: {
    margin: 20,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  logoutIcon: {
    fontSize: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  copyrightText: {
    fontSize: 12,
    marginBottom: 5,
    textAlign: "center",
  },
  developerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  developedByText: {
    fontSize: 13,
  },
  developerName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  versionText: {
    fontSize: 11,
    marginTop: 10,
    fontStyle: "italic",
  },
});
