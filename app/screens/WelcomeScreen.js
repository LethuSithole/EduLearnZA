import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logo}>📚</Text>
          <Text style={styles.title}>EduLearnZA</Text>
          <Text style={styles.subtitle}>Your Gateway to Quality Education</Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresSection}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>📖</Text>
            <Text style={styles.featureText}>Interactive Learning</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🎯</Text>
            <Text style={styles.featureText}>Practice Tests</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🤖</Text>
            <Text style={styles.featureText}>AI Study Assistant</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🤟</Text>
            <Text style={styles.featureText}>Sign Language</Text>
          </View>
        </View>

        {/* Buttons Section */}
        <View style={styles.buttonsSection}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.primaryButtonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate("SignUpScreen")}
          >
            <Text style={styles.secondaryButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Empowering South African Students 🇿🇦
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6200EE",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  logoSection: {
    alignItems: "center",
    marginTop: height * 0.08,
  },
  logo: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#E8DEFF",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  featuresSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginVertical: 30,
  },
  featureItem: {
    width: "45%",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  featureIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  featureText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  buttonsSection: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    marginBottom: 15,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryButtonText: {
    color: "#6200EE",
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderRadius: 16,
    padding: 18,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  secondaryButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: "#E8DEFF",
    textAlign: "center",
  },
});
