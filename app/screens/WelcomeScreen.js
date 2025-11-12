import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#6200EE", "#BB86FC", "#03DAC6"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.content}>
          {/* Logo/Icon */}
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>🎓</Text>
            <Text style={styles.logoText}>EduLearnZA</Text>
          </View>

          {/* Welcome Text */}
          <View style={styles.textContainer}>
            <Text style={styles.welcomeTitle}>Welcome to EduLearnZA</Text>
            <Text style={styles.welcomeSubtitle}>
              Your personalized learning companion for South African students
            </Text>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📚</Text>
              <Text style={styles.featureText}>Interactive Learning</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📝</Text>
              <Text style={styles.featureText}>Practice Tests</Text>
            </View>
            <View style={styles.feature}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Track Progress</Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.getStartedButton}
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.loginButtonText}>
                Already have an account? Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logoIcon: {
    fontSize: 80,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  textContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    lineHeight: 26,
    opacity: 0.95,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 30,
  },
  feature: {
    alignItems: "center",
    flex: 1,
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  buttonContainer: {
    width: "100%",
    gap: 15,
  },
  getStartedButton: {
    backgroundColor: "#fff",
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  getStartedButtonText: {
    color: "#6200EE",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginButton: {
    paddingVertical: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
