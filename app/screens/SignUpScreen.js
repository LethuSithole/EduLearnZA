import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [grade, setGrade] = useState("12");
  const [loading, setLoading] = useState(false);
  const { signup } = useContext(AuthContext);

  const grades = ["8", "9", "10", "11", "12"];

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Error", "Password must be at least 6 characters");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const result = await signup(email, password, name, grade);
      if (result.success) {
        Alert.alert("Success", "Account created successfully!");
      } else {
        Alert.alert(
          "Sign Up Failed",
          result.error || "Could not create account"
        );
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
            <Text style={styles.logo}>📚</Text>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join EduLearnZA Today!</Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Select Your Grade</Text>
              <View style={styles.gradeContainer}>
                {grades.map((g) => (
                  <TouchableOpacity
                    key={g}
                    style={[
                      styles.gradeButton,
                      grade === g && styles.gradeButtonActive,
                    ]}
                    onPress={() => setGrade(g)}
                  >
                    <Text
                      style={[
                        styles.gradeButtonText,
                        grade === g && styles.gradeButtonTextActive,
                      ]}
                    >
                      {g}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Create a password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Re-enter your password"
                placeholderTextColor="#999"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Creating Account..." : "Sign Up"}
              </Text>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={styles.loginLink}>Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  keyboardView: { flex: 1 },
  scrollView: { flexGrow: 1, padding: 20 },
  header: { alignItems: "center", marginBottom: 30, marginTop: 20 },
  backButton: { alignSelf: "flex-start", marginBottom: 20 },
  backButtonText: { fontSize: 16, color: "#6200EE", fontWeight: "600" },
  logo: { fontSize: 50, marginBottom: 10 },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#6200EE",
    marginBottom: 5,
  },
  subtitle: { fontSize: 16, color: "#666" },
  form: { width: "100%" },
  inputContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", color: "#333", marginBottom: 8 },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  gradeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  gradeButton: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
  },
  gradeButtonActive: { backgroundColor: "#6200EE", borderColor: "#6200EE" },
  gradeButtonText: { fontSize: 16, fontWeight: "600", color: "#333" },
  gradeButtonTextActive: { color: "#FFF" },
  button: {
    backgroundColor: "#6200EE",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    elevation: 3,
  },
  buttonDisabled: { backgroundColor: "#9E9E9E" },
  buttonText: { color: "#FFF", fontSize: 18, fontWeight: "bold" },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: { fontSize: 14, color: "#666" },
  loginLink: { fontSize: 14, color: "#6200EE", fontWeight: "bold" },
});
