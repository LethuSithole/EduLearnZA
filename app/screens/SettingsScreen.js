import React, { useState } from "react";
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
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

export default function SettingsScreen({ navigation }) {
  const themeContext = useTheme();
  const { user, logout } = useAuth();
  const theme = themeContext?.theme || {
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#6200EE",
    border: "#e0e0e0",
    error: "#F44336",
  };

  const [notifications, setNotifications] = useState(true);
  const [sound, setSound] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          await logout();
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        },
      },
    ]);
  };

  const handleClearData = () => {
    Alert.alert(
      "Clear Data",
      "This will delete all your progress and settings. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: () => {
            Alert.alert("Success", "All data has been cleared");
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Settings
          </Text>
          <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
            Manage your app preferences
          </Text>
        </View>

        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Profile
          </Text>
          <View
            style={[styles.profileCard, { backgroundColor: theme.surface }]}
          >
            <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </Text>
            </View>
            <View style={styles.profileInfo}>
              <Text style={[styles.profileName, { color: theme.text }]}>
                {user?.name || "User"}
              </Text>
              <Text
                style={[styles.profileEmail, { color: theme.textSecondary }]}
              >
                {user?.email || "user@example.com"}
              </Text>
            </View>
          </View>
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            App Settings
          </Text>

          <View
            style={[styles.settingCard, { backgroundColor: theme.surface }]}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  🔔 Notifications
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Receive quiz reminders and updates
                </Text>
              </View>
              <Switch
                value={notifications}
                onValueChange={setNotifications}
                trackColor={{ false: theme.border, true: theme.primary + "80" }}
                thumbColor={notifications ? theme.primary : "#f4f3f4"}
              />
            </View>
          </View>

          <View
            style={[styles.settingCard, { backgroundColor: theme.surface }]}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  🔊 Sound Effects
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Play sounds for correct/incorrect answers
                </Text>
              </View>
              <Switch
                value={sound}
                onValueChange={setSound}
                trackColor={{ false: theme.border, true: theme.primary + "80" }}
                thumbColor={sound ? theme.primary : "#f4f3f4"}
              />
            </View>
          </View>

          <View
            style={[styles.settingCard, { backgroundColor: theme.surface }]}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  💾 Auto-save Progress
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Automatically save quiz progress
                </Text>
              </View>
              <Switch
                value={autoSave}
                onValueChange={setAutoSave}
                trackColor={{ false: theme.border, true: theme.primary + "80" }}
                thumbColor={autoSave ? theme.primary : "#f4f3f4"}
              />
            </View>
          </View>

          <View
            style={[styles.settingCard, { backgroundColor: theme.surface }]}
          >
            <View style={styles.settingRow}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingLabel, { color: theme.text }]}>
                  🌙 Dark Mode
                </Text>
                <Text
                  style={[
                    styles.settingDescription,
                    { color: theme.textSecondary },
                  ]}
                >
                  Switch to dark theme
                </Text>
              </View>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: theme.border, true: theme.primary + "80" }}
                thumbColor={darkMode ? theme.primary : "#f4f3f4"}
              />
            </View>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            About
          </Text>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.menuLabel, { color: theme.text }]}>
              📄 Privacy Policy
            </Text>
            <Text style={[styles.menuArrow, { color: theme.textSecondary }]}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.menuLabel, { color: theme.text }]}>
              📋 Terms of Service
            </Text>
            <Text style={[styles.menuArrow, { color: theme.textSecondary }]}>
              ›
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: theme.surface }]}
          >
            <Text style={[styles.menuLabel, { color: theme.text }]}>
              ℹ️ App Version
            </Text>
            <Text style={[styles.menuValue, { color: theme.textSecondary }]}>
              1.0.0
            </Text>
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.error }]}>
            Danger Zone
          </Text>

          <TouchableOpacity
            style={[styles.dangerButton, { borderColor: theme.error }]}
            onPress={handleClearData}
          >
            <Text style={[styles.dangerButtonText, { color: theme.error }]}>
              🗑️ Clear All Data
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.error }]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
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
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  section: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  avatarText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 14,
  },
  settingCard: {
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  menuArrow: {
    fontSize: 24,
  },
  menuValue: {
    fontSize: 14,
  },
  dangerButton: {
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    marginBottom: 12,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
