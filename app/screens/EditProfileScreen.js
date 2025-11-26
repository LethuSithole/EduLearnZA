import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function EditProfileScreen({ navigation }) {
  const { user, updateUserProfile } = useContext(AuthContext);
  const { theme } = useTheme();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [grade, setGrade] = useState(user?.grade || "12");
  const [school, setSchool] = useState(user?.school || "");
  const [address, setAddress] = useState(user?.address || "");
  const [isEditing, setIsEditing] = useState(false);

  const grades = ["8", "9", "10", "11", "12"];

  const handleSave = async () => {
    // Validation
    if (!displayName.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    // Phone validation (optional but if provided must be valid)
    if (phone && phone.length > 0 && phone.length < 10) {
      Alert.alert("Error", "Please enter a valid phone number (10 digits)");
      return;
    }

    setIsEditing(true);

    try {
      const updatedData = {
        displayName: displayName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        grade,
        school: school.trim(),
        address: address.trim(),
      };

      await updateUserProfile(updatedData);

      Alert.alert("Success", "Your profile has been updated successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      "Discard Changes",
      "Are you sure you want to discard your changes?",
      [
        { text: "Continue Editing", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: theme.surface }]}>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={[styles.cancelButton, { color: theme.primary }]}>
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Edit Profile
          </Text>
          <TouchableOpacity onPress={handleSave} disabled={isEditing}>
            <Text
              style={[
                styles.saveButton,
                { color: isEditing ? theme.textSecondary : theme.primary },
              ]}
            >
              {isEditing ? "Saving..." : "Save"}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
              <Text style={styles.avatarText}>
                {displayName.charAt(0).toUpperCase() || "U"}
              </Text>
            </View>
            <TouchableOpacity style={styles.changePhotoButton}>
              <Text style={[styles.changePhotoText, { color: theme.primary }]}>
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            {/* Display Name */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                Full Name *
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: theme.surface },
                ]}
              >
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  value={displayName}
                  onChangeText={setDisplayName}
                  placeholder="Enter your full name"
                  placeholderTextColor={theme.textSecondary}
                />
              </View>
            </View>

            {/* Email */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                Email Address *
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: theme.surface },
                ]}
              >
                <Text style={styles.inputIcon}>📧</Text>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>
            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                Phone Number
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: theme.surface },
                ]}
              >
                <Text style={styles.inputIcon}>📱</Text>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone number"
                  placeholderTextColor={theme.textSecondary}
                  keyboardType="phone-pad"
                  maxLength={10}
                />
              </View>
            </View>

            {/* Grade */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Grade *</Text>
              <View style={styles.gradeSelector}>
                {grades.map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.gradeButton,
                      {
                        backgroundColor:
                          grade === g ? theme.primary : theme.surface,
                        borderColor: grade === g ? theme.primary : theme.border,
                      },
                    ]}
                    onPress={() => setGrade(g)}
                  >
                    <Text
                      style={[
                        styles.gradeButtonText,
                        { color: grade === g ? "#fff" : theme.text },
                      ]}
                    >
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* School */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>
                School Name
              </Text>
              <View
                style={[
                  styles.inputContainer,
                  { backgroundColor: theme.surface },
                ]}
              >
                <Text style={styles.inputIcon}>🏫</Text>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  value={school}
                  onChangeText={setSchool}
                  placeholder="Enter your school name"
                  placeholderTextColor={theme.textSecondary}
                />
              </View>
            </View>

            {/* Address */}
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Address</Text>
              <View
                style={[
                  styles.inputContainer,
                  styles.textAreaContainer,
                  { backgroundColor: theme.surface },
                ]}
              >
                <Text style={styles.inputIcon}>📍</Text>
                <TextInput
                  style={[styles.input, styles.textArea, { color: theme.text }]}
                  value={address}
                  onChangeText={setAddress}
                  placeholder="Enter your address"
                  placeholderTextColor={theme.textSecondary}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>
          </View>

          {/* Info Banner */}
          <View style={[styles.infoBanner, { backgroundColor: "#E3F2FD" }]}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={styles.infoText}>
              Fields marked with * are required. Your email is used for account
              recovery and notifications.
            </Text>
          </View>

          {/* Save Button (Bottom) */}
          <TouchableOpacity
            style={[
              styles.saveButtonLarge,
              {
                backgroundColor: isEditing
                  ? theme.textSecondary
                  : theme.primary,
              },
            ]}
            onPress={handleSave}
            disabled={isEditing}
          >
            <Text style={styles.saveButtonLargeText}>
              {isEditing ? "Saving Changes..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cancelButton: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  avatarSection: {
    alignItems: "center",
    paddingVertical: 30,
  },
  avatar: {
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
  changePhotoButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  changePhotoText: {
    fontSize: 16,
    fontWeight: "600",
  },
  formSection: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  textAreaContainer: {
    alignItems: "flex-start",
    paddingTop: 15,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 15,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  gradeSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  gradeButton: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    elevation: 2,
  },
  gradeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoBanner: {
    flexDirection: "row",
    margin: 20,
    marginTop: 0,
    padding: 15,
    borderRadius: 12,
    alignItems: "flex-start",
  },
  infoIcon: {
    fontSize: 20,
    marginRight: 12,
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: "#1565C0",
  },
  saveButtonLarge: {
    margin: 20,
    marginTop: 10,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
  },
  saveButtonLargeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
