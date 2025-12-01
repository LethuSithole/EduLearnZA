import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "http://192.168.1.100:5000/api"; // Replace with your actual IP

export default function EditProfileScreen({ navigation }) {
  const { user, updateUser } = useContext(AuthContext);
  const { theme } = useTheme();

  const [name, setName] = useState(user?.name || "");
  const [grade, setGrade] = useState(user?.grade?.toString() || "");
  const [selectedSubjects, setSelectedSubjects] = useState(user?.subjects || []);
  const [profilePhoto, setProfilePhoto] = useState(user?.profilePhoto || null);
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  const grades = ["8", "9", "10", "11", "12"];

  const availableSubjects = [
    { name: "Mathematics", icon: "📐", color: "#FF6B6B" },
    { name: "English", icon: "📚", color: "#4ECDC4" },
    { name: "Physical Sciences", icon: "⚗️", color: "#45B7D1" },
    { name: "Life Sciences", icon: "🧬", color: "#96CEB4" },
    { name: "History", icon: "📜", color: "#FFEAA7" },
    { name: "Geography", icon: "🌍", color: "#74B9FF" },
    { name: "Accounting", icon: "💰", color: "#A29BFE" },
    { name: "Business Studies", icon: "💼", color: "#FD79A8" },
    { name: "Economics", icon: "📊", color: "#FDCB6E" },
  ];

  const toggleSubject = (subjectName) => {
    if (selectedSubjects.includes(subjectName)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subjectName));
    } else {
      setSelectedSubjects([...selectedSubjects, subjectName]);
    }
  };

  const compressImage = async (uri) => {
    try {
      // Compress and resize image
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 400 } }], // Resize to max width 400px
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );
      return manipulatedImage.uri;
    } catch (error) {
      console.error("Image compression error:", error);
      return uri; // Return original if compression fails
    }
  };

  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Please allow access to your photo library"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Reduced quality for faster upload
      });

      if (!result.canceled && result.assets[0]) {
        const compressedUri = await compressImage(result.assets[0].uri);
        await uploadPhoto(compressedUri);
      }
    } catch (error) {
      console.error("Image picker error:", error);
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const takePhoto = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert("Permission Required", "Please allow camera access");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5, // Reduced quality for faster upload
      });

      if (!result.canceled && result.assets[0]) {
        const compressedUri = await compressImage(result.assets[0].uri);
        await uploadPhoto(compressedUri);
      }
    } catch (error) {
      console.error("Camera error:", error);
      Alert.alert("Error", "Failed to take photo");
    }
  };

  const uploadPhoto = async (uri) => {
    try {
      setUploadingPhoto(true);

      const formData = new FormData();
      const filename = uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image/jpeg`;

      formData.append("photo", {
        uri,
        name: filename || `photo_${Date.now()}.jpg`,
        type,
      });

      const token = await AsyncStorage.getItem("userToken");

      console.log("Uploading photo to:", `${API_URL}/auth/profile/photo`);

      const response = await axios.post(
        `${API_URL}/auth/profile/photo`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          timeout: 30000, // 30 seconds timeout
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`Upload progress: ${percentCompleted}%`);
          },
        }
      );

      console.log("Upload response:", response.data);

      if (response.data.success) {
        setProfilePhoto(response.data.profilePhoto);
        // Update user context
        await updateUser({
          ...user,
          profilePhoto: response.data.profilePhoto,
        });
        Alert.alert("Success", "Profile photo updated successfully!");
      }
    } catch (error) {
      console.error("Photo upload error:", error.response?.data || error.message);

      if (error.code === "ECONNABORTED") {
        Alert.alert(
          "Upload Timeout",
          "The upload took too long. Please try with a smaller image or check your internet connection."
        );
      } else if (error.message.includes("Network Error")) {
        Alert.alert(
          "Network Error",
          "Cannot connect to server. Please check if the API is running and your IP address is correct."
        );
      } else {
        Alert.alert(
          "Upload Failed",
          error.response?.data?.error || "Failed to upload photo. Please try again."
        );
      }
    } finally {
      setUploadingPhoto(false);
    }
  };

  const showPhotoOptions = () => {
    Alert.alert("Change Profile Photo", "Choose an option:", [
      {
        text: "Take Photo",
        onPress: takePhoto,
      },
      {
        text: "Choose from Library",
        onPress: pickImage,
      },
      ...(profilePhoto
        ? [
            {
              text: "Remove Photo",
              onPress: removePhoto,
              style: "destructive",
            },
          ]
        : []),
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  };

  const removePhoto = async () => {
    try {
      setUploadingPhoto(true);
      const token = await AsyncStorage.getItem("userToken");

      const response = await axios.delete(`${API_URL}/auth/profile/photo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 10000,
      });

      if (response.data.success) {
        setProfilePhoto(null);
        await updateUser({
          ...user,
          profilePhoto: null,
        });
        Alert.alert("Success", "Profile photo removed");
      }
    } catch (error) {
      console.error("Photo remove error:", error);
      Alert.alert("Error", "Failed to remove photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    if (!grade) {
      Alert.alert("Error", "Please select your grade");
      return;
    }

    if (selectedSubjects.length === 0) {
      Alert.alert("Error", "Please select at least one subject");
      return;
    }

    try {
      setLoading(true);

      await updateUser({
        name: name.trim(),
        grade: parseInt(grade),
        subjects: selectedSubjects,
        profilePhoto: profilePhoto,
      });

      Alert.alert("Success", "Profile updated successfully!", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPhotoUrl = () => {
    if (profilePhoto) {
      if (profilePhoto.startsWith("http")) {
        return profilePhoto;
      }
      return `${API_URL.replace("/api", "")}${profilePhoto}`;
    }
    return null;
  };

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
          Edit Profile
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Profile Photo */}
        <View style={styles.photoSection}>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={showPhotoOptions}
            disabled={uploadingPhoto}
          >
            {uploadingPhoto ? (
              <View
                style={[
                  styles.photoPlaceholder,
                  { backgroundColor: theme.surface },
                ]}
              >
                <ActivityIndicator size="large" color={theme.primary} />
                <Text
                  style={[
                    styles.uploadingText,
                    { color: theme.textSecondary },
                  ]}
                >
                  Uploading...
                </Text>
              </View>
            ) : getPhotoUrl() ? (
              <Image source={{ uri: getPhotoUrl() }} style={styles.photo} />
            ) : (
              <View
                style={[
                  styles.photoPlaceholder,
                  { backgroundColor: theme.surface, borderColor: theme.border },
                ]}
              >
                <Text style={styles.photoPlaceholderText}>
                  {name.charAt(0).toUpperCase() || "?"}
                </Text>
              </View>
            )}
            {!uploadingPhoto && (
              <View
                style={[styles.cameraIcon, { backgroundColor: theme.primary }]}
              >
                <Text style={styles.cameraIconText}>📷</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={[styles.photoHint, { color: theme.textSecondary }]}>
            Tap to change profile photo
          </Text>
        </View>

        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Full Name</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            value={name}
            onChangeText={setName}
            placeholder="Enter your full name"
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        {/* Grade Selection */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Grade</Text>
          <View style={styles.gradeContainer}>
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
                    { color: grade === g ? "#FFF" : theme.text },
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Subject Selection */}
        <View style={styles.inputGroup}>
          <Text style={[styles.label, { color: theme.text }]}>
            Select Your Subjects
          </Text>
          <View style={styles.subjectsContainer}>
            {availableSubjects.map((subject) => {
              const isSelected = selectedSubjects.includes(subject.name);
              return (
                <TouchableOpacity
                  key={subject.name}
                  style={[
                    styles.subjectCard,
                    {
                      backgroundColor: isSelected
                        ? subject.color + "20"
                        : theme.surface,
                      borderColor: isSelected ? subject.color : theme.border,
                      borderWidth: isSelected ? 2 : 1,
                    },
                  ]}
                  onPress={() => toggleSubject(subject.name)}
                >
                  <Text style={styles.subjectIcon}>{subject.icon}</Text>
                  <Text
                    style={[
                      styles.subjectName,
                      {
                        color: isSelected ? subject.color : theme.text,
                        fontWeight: isSelected ? "bold" : "normal",
                      },
                    ]}
                  >
                    {subject.name}
                  </Text>
                  {isSelected && (
                    <View
                      style={[
                        styles.checkmark,
                        { backgroundColor: subject.color },
                      ]}
                    >
                      <Text style={styles.checkmarkText}>✓</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            { backgroundColor: theme.primary },
            loading && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>

        <View style={styles.spacer} />
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
    padding: 20,
  },
  photoSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  photoContainer: {
    position: "relative",
    marginBottom: 10,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  photoPlaceholderText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#666",
  },
  uploadingText: {
    fontSize: 12,
    marginTop: 8,
  },
  cameraIcon: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  cameraIconText: {
    fontSize: 18,
  },
  photoHint: {
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
  },
  gradeContainer: {
    flexDirection: "row",
    gap: 10,
  },
  gradeButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
  },
  gradeButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  subjectsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  subjectCard: {
    width: "48%",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    position: "relative",
  },
  subjectIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  subjectName: {
    fontSize: 14,
    textAlign: "center",
  },
  checkmark: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkmarkText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  saveButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    elevation: 3,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  spacer: {
    height: 30,
  },
});
