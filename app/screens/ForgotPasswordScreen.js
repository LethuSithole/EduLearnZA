import React, { useState } from "react";
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
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import authService from "../services/authService";

export default function ForgotPasswordScreen({ navigation }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendResetLink = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    setLoading(true);

    try {
      // Use mock implementation for demo
      const result = await authService.sendPasswordResetEmailMock(email);

      if (result.success) {
        setEmailSent(true);
        Alert.alert("Email Sent! ✉️", result.message, [
          {
            text: "OK",
            onPress: () => {
              // For demo, navigate to reset password screen
              navigation.navigate("ResetPassword", {
                email: email,
                token: result.token,
              });
            },
          },
        ]);
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.backButtonText, { color: theme.primary }]}>
                ← Back to Login
              </Text>
            </TouchableOpacity>

            <Text style={styles.icon}>🔐</Text>
            <Text style={[styles.title, { color: theme.text }]}>
              Forgot Password?
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {emailSent
                ? "Check your email for reset instructions"
                : "Enter your email and we'll send you a reset link"}
            </Text>
          </View>

          {/* Form */}
          <View style={[styles.form, { backgroundColor: theme.surface }]}>
            {!emailSent && (
              <>
                <View style={styles.inputContainer}>
                  <Text style={[styles.label, { color: theme.text }]}>
                    Email Address
                  </Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: theme.background,
                        borderColor: theme.border,
                      },
                    ]}
                  >
                    <Text style={styles.inputIcon}>📧</Text>
                    <TextInput
                      style={[styles.input, { color: theme.text }]}
                      placeholder="Enter your email"
                      placeholderTextColor={theme.textSecondary}
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!loading}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  style={[
                    styles.sendButton,
                    {
                      backgroundColor: theme.primary,
                      opacity: loading ? 0.6 : 1,
                    },
                  ]}
                  onPress={handleSendResetLink}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.sendButtonText}>Send Reset Link</Text>
                  )}
                </TouchableOpacity>
              </>
            )}

            {emailSent && (
              <View style={styles.successContainer}>
                <Text style={styles.successIcon}>✅</Text>
                <Text style={[styles.successText, { color: theme.text }]}>
                  Reset link sent to:
                </Text>
                <Text style={[styles.emailText, { color: theme.primary }]}>
                  {email}
                </Text>
                <TouchableOpacity
                  style={[styles.resendButton, { borderColor: theme.primary }]}
                  onPress={() => {
                    setEmailSent(false);
                    setEmail("");
                  }}
                >
                  <Text
                    style={[styles.resendButtonText, { color: theme.primary }]}
                  >
                    Try Another Email
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          {/* Info */}
          <View style={[styles.infoCard, { backgroundColor: theme.surface }]}>
            <Text style={styles.infoIcon}>💡</Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              <Text style={{ fontWeight: "bold" }}>Tip:</Text> If you don't
              receive an email within 5 minutes, check your spam folder or try
              again.
            </Text>
          </View>
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
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 30,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  form: {
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  inputIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
  },
  sendButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  successContainer: {
    alignItems: "center",
    paddingVertical: 20,
  },
  successIcon: {
    fontSize: 60,
    marginBottom: 20,
  },
  successText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 30,
  },
  resendButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 2,
  },
  resendButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  infoCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
});
