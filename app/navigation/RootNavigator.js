import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

// Auth Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

// Main Screens
import MainTab from "./MainTab";
import TakeTestScreen from "../screens/TakeTestScreen";
import LearnMoreScreen from "../screens/LearnMoreScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  // Show loading screen while checking auth state
  if (loading) {
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // User is authenticated - show main app
        <>
          <Stack.Screen name="MainApp" component={MainTab} />
          <Stack.Screen name="TakeTest" component={TakeTestScreen} />
          <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
        </>
      ) : (
        // User is not authenticated - show auth screens
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
