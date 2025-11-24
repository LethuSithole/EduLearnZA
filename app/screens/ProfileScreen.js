import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function ProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme, isDarkMode } = useTheme();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView style={styles.scrollView}>
        {/* Profile Header */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <Text style={styles.avatarText}>
              {user?.displayName?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={[styles.name, { color: theme.text }]}>
            {user?.displayName || "User"}
          </Text>
          <Text style={[styles.email, { color: theme.textSecondary }]}>
            {user?.email || "user@example.com"}
          </Text>
          <View style={[styles.gradeBadge, { backgroundColor: theme.primary }]}>
            <Text style={styles.gradeText}>Grade {user?.grade || "12"}</Text>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Settings
          </Text>

          {/* Theme Toggle */}
          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: theme.surface }]}
            onPress={toggleTheme}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingIcon}>{isDarkMode ? "🌙" : "☀️"}</Text>
              <Text style={[styles.settingText, { color: theme.text }]}>
                {isDarkMode ? "Dark Mode" : "Light Mode"}
              </Text>
            </View>
            <Text style={[styles.settingValue, { color: theme.textSecondary }]}>
              {isDarkMode ? "On" : "Off"}
            </Text>
          </TouchableOpacity>

          {/* About */}
          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: theme.surface }]}
            onPress={() => Alert.alert("About", "EduLearn ZA v1.0.0")}
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingIcon}>ℹ️</Text>
              <Text style={[styles.settingText, { color: theme.text }]}>
                About
              </Text>
            </View>
            <Text style={[styles.settingValue, { color: theme.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>

          {/* Help */}
          <TouchableOpacity
            style={[styles.settingItem, { backgroundColor: theme.surface }]}
            onPress={() =>
              Alert.alert("Help", "Contact support@edulearnza.com")
            }
          >
            <View style={styles.settingInfo}>
              <Text style={styles.settingIcon}>❓</Text>
              <Text style={[styles.settingText, { color: theme.text }]}>
                Help & Support
              </Text>
            </View>
            <Text style={[styles.settingValue, { color: theme.textSecondary }]}>
              →
            </Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Statistics
          </Text>
          <View style={[styles.statsCard, { backgroundColor: theme.surface }]}>
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                0
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Tests Taken
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                0%
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Avg Score
              </Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={[styles.statValue, { color: theme.primary }]}>
                0h
              </Text>
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Study Time
              </Text>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: "#FF6B6B" }]}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
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
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    marginBottom: 15,
  },
  gradeBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  gradeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  settingInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "500",
  },
  settingValue: {
    fontSize: 16,
  },
  statsCard: {
    flexDirection: "row",
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    textAlign: "center",
  },
  statDivider: {
    width: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 10,
  },
  logoutButton: {
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
