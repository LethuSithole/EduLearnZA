import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function RegisterScreen({ navigation }) {
  const { register } = useContext(AuthContext);
  const { theme } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const handleRegister = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert("Error", "Please enter your name");
      return;
    }

    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email");
      return;
    }

    if (!password) {
      Alert.alert("Error", "Please enter a password");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
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
      await register(email, password, name, parseInt(grade), selectedSubjects);
    } catch (error) {
      Alert.alert("Registration Failed", error.message || "Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            Create Account
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Join EduLearnZA and start learning
          </Text>
        </View>

        {/* Name Input */}
        <View style={styles.inputContainer}>
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
            placeholder="Enter your full name"
            placeholderTextColor={theme.textSecondary}
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Email</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Enter your email"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>Password</Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Enter password (min 6 characters)"
            placeholderTextColor={theme.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            Confirm Password
          </Text>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.surface,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Confirm your password"
            placeholderTextColor={theme.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        {/* Grade Selection */}
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            Select Your Grade
          </Text>
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
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            Select Your Subjects (Choose at least 1)
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

        {/* Register Button */}
        <TouchableOpacity
          style={[
            styles.registerButton,
            { backgroundColor: theme.primary },
            loading && styles.registerButtonDisabled,
          ]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.registerButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.loginLink}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={[styles.loginLinkText, { color: theme.textSecondary }]}>
            Already have an account?{" "}
            <Text style={{ color: theme.primary, fontWeight: "bold" }}>
              Login
            </Text>
          </Text>
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
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
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
  registerButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    elevation: 3,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginLink: {
    marginTop: 20,
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: 14,
  },
  spacer: {
    height: 30,
  },
});
