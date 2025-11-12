import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  Switch,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import GradePicker from "../components/GradePicker";

export default function ProfileScreen() {
  const { user, logout, updateUserGrade, updateUserProfile } =
    useContext(AuthContext);
  const themeContext = useTheme();
  const { theme, isDarkMode, toggleTheme } = themeContext || {
    theme: {
      background: "#f5f5f5",
      surface: "#ffffff",
      text: "#000000",
      textSecondary: "#666666",
      primary: "#6200EE",
      border: "#e0e0e0",
    },
    isDarkMode: false,
    toggleTheme: () => {},
  };

  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState(user?.displayName || "");
  const [saving, setSaving] = useState(false);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          const result = await logout();
          if (!result.success) {
            Alert.alert("Error", "Failed to logout");
          }
        },
      },
    ]);
  };

  const handleEditProfile = () => {
    setEditName(user?.displayName || "");
    setShowEditModal(true);
  };

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }

    if (editName.trim().length < 2) {
      Alert.alert("Error", "Name must be at least 2 characters long");
      return;
    }

    setSaving(true);
    const result = await updateUserProfile(editName.trim());
    setSaving(false);

    if (result.success) {
      setShowEditModal(false);
      Alert.alert("Success", "Profile updated successfully!");
    } else {
      Alert.alert("Error", result.error || "Failed to update profile");
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {user?.displayName?.charAt(0).toUpperCase() || "U"}
            </Text>
          </View>
          <Text style={[styles.name, { color: theme.text }]}>
            {user?.displayName || "User"}
          </Text>
          <Text style={[styles.email, { color: theme.textSecondary }]}>
            {user?.email}
          </Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Tests Taken
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={styles.statNumber}>85%</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Avg Score
            </Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={styles.statNumber}>45</Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Study Hours
            </Text>
          </View>
        </View>

        {/* Grade Selection */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Your Grade
          </Text>
          <GradePicker
            selectedGrade={user?.grade || "12"}
            onGradeChange={updateUserGrade}
          />
        </View>

        {/* Settings Options */}
        <View style={[styles.section, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Settings
          </Text>

          {/* Dark Mode Toggle */}
          <TouchableOpacity
            style={[styles.option, { borderBottomColor: theme.border }]}
            onPress={toggleTheme}
          >
            <Text style={styles.optionIcon}>🌙</Text>
            <Text style={[styles.optionText, { color: theme.text }]}>
              Dark Mode
            </Text>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#767577", true: "#BB86FC" }}
              thumbColor={isDarkMode ? "#6200EE" : "#f4f3f4"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, { borderBottomColor: theme.border }]}
            onPress={() => setShowPrivacyModal(true)}
          >
            <Text style={styles.optionIcon}>🔒</Text>
            <Text style={[styles.optionText, { color: theme.text }]}>
              Privacy Policy
            </Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, { borderBottomWidth: 0 }]}
            onPress={() => setShowAboutModal(true)}
          >
            <Text style={styles.optionIcon}>ℹ️</Text>
            <Text style={[styles.optionText, { color: theme.text }]}>
              About
            </Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        {/* App Version & Copyright Section */}
        <View style={styles.versionContainer}>
          <Text style={[styles.versionText, { color: theme.textSecondary }]}>
            EduLearnZA v1.0.0
          </Text>
          <Text style={[styles.copyrightText, { color: theme.textSecondary }]}>
            © 2025 EduLearnZA. All rights reserved.
          </Text>
          <Text style={[styles.developerText, { color: "#999999" }]}>
            Developed by Lethu_M
          </Text>
        </View>
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowEditModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.editModalContent,
              { backgroundColor: theme.surface },
            ]}
          >
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Edit Profile
            </Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.text }]}>
                Full Name
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  {
                    backgroundColor: theme.background,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="Enter your name"
                placeholderTextColor={theme.textSecondary}
                value={editName}
                onChangeText={setEditName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>
                Email (cannot be changed)
              </Text>
              <TextInput
                style={[
                  styles.textInput,
                  styles.disabledInput,
                  {
                    backgroundColor: theme.background,
                    color: theme.textSecondary,
                    borderColor: theme.border,
                  },
                ]}
                value={user?.email}
                editable={false}
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: theme.border }]}
                onPress={() => setShowEditModal(false)}
                disabled={saving}
              >
                <Text style={[styles.cancelButtonText, { color: theme.text }]}>
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                onPress={handleSaveProfile}
                disabled={saving}
              >
                <Text style={styles.saveButtonText}>
                  {saving ? "Saving..." : "Save Changes"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* About Modal */}
      <Modal
        visible={showAboutModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAboutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: theme.surface }]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                About EduLearnZA
              </Text>

              <Text style={[styles.modalText, { color: theme.text }]}>
                <Text style={styles.bold}>EduLearnZA</Text> is a comprehensive
                educational platform designed specifically for South African
                students in grades 8-12.
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Our Mission
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                To provide accessible, high-quality education resources that
                
                empower South African students to excel academically and reach
                their full potential.
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Features
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                • Interactive learning materials{"\n"}• Practice tests and
                quizzes{"\n"}• Progress tracking and analytics{"\n"}•
                Grade-specific content (Grades 8-12){"\n"}• Aligned with South
                African curriculum{"\n"}• Personalized study recommendations
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Contact Us
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                Email: lethusithole7@gmail.com{"\n"}
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Version
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                EduLearnZA v1.0.0{"\n"}
                Released: December 2025
              </Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowAboutModal(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        visible={showPrivacyModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[styles.modalContent, { backgroundColor: theme.surface }]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.modalTitle, { color: theme.text }]}>
                Privacy Policy
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Information We Collect
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                We collect information that you provide directly to us,
                including:{"\n"}• Name and email address{"\n"}• Grade level
                {"\n"}• Test scores and study progress{"\n"}• Usage data and
                preferences
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                How We Use Your Information
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                • To provide and improve our educational services{"\n"}• To
                personalize your learning experience{"\n"}• To track your
                academic progress{"\n"}• To communicate important updates{"\n"}•
                To analyze app usage and performance
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Data Security
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                We implement industry-standard security measures to protect your
                personal information. Your data is encrypted both in transit and
                at rest.
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Data Sharing
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                We do not sell, trade, or share your personal information with
                third parties except as required by law or with your explicit
                consent.
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Your Rights
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                You have the right to:{"\n"}• Access your personal data{"\n"}•
                Request data correction or deletion{"\n"}• Opt-out of
                communications{"\n"}• Export your data
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Children's Privacy
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                Our service is designed for students aged 13 and above. We
                comply with applicable laws regarding children's online privacy.
              </Text>

              <Text style={[styles.modalSubtitle, { color: theme.text }]}>
                Contact
              </Text>
              <Text style={[styles.modalText, { color: theme.text }]}>
                For privacy concerns, contact us at:{"\n"}
                privacy@edulearnza.co.za
              </Text>

              <Text
                style={[
                  styles.modalText,
                  { color: theme.textSecondary, fontStyle: "italic" },
                ]}
              >
                Last updated: December 2025
              </Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setShowPrivacyModal(false)}
              >
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#6200EE",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
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
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#6200EE",
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    padding: 15,
    marginHorizontal: 5,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
  },
  optionArrow: {
    fontSize: 24,
    color: "#999",
  },
  logoutButton: {
    marginHorizontal: 20,
    backgroundColor: "#DC3545",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  versionContainer: {
    alignItems: "center",
    marginTop: 30,
    paddingTop: 20,
    paddingBottom: 10,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    marginHorizontal: 20,
  },
  versionText: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  copyrightText: {
    fontSize: 11,
    marginBottom: 5,
    textAlign: "center",
  },
  developerText: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    maxHeight: "80%",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  editModalContent: {
    width: "90%",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 15,
  },
  bold: {
    fontWeight: "bold",
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  disabledInput: {
    opacity: 0.6,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalButton: {
    backgroundColor: "#6200EE",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
