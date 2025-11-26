import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

// Auth Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen"; // Changed from SignUpScreen
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";

// Main Screens
import MainTab from "./MainTab";
import SubjectDetailsScreen from "../screens/SubjectDetailsScreen";
import LearnMoreScreen from "../screens/LearnMoreScreen";
import QuizScreen from "../screens/QuizScreen";
import GradeSelectionScreen from "../screens/GradeSelectionScreen";
import AllSubjectsTestScreen from "../screens/AllSubjectsTestScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import SignLanguageScreen from "../screens/SignLanguageScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import TopicQuestionsScreen from "../screens/TopicQuestionsScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null; // or a loading screen
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!user ? (
        // Auth Stack
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUpScreen" component={SignupScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      ) : (
        // Main Stack
        <>
          <Stack.Screen name="MainTabs" component={MainTab} />
          <Stack.Screen
            name="SubjectDetails"
            component={SubjectDetailsScreen}
          />
          <Stack.Screen name="LearnMore" component={LearnMoreScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen
            name="GradeSelection"
            component={GradeSelectionScreen}
          />
          <Stack.Screen
            name="AllSubjectsTest"
            component={AllSubjectsTestScreen}
          />
          <Stack.Screen name="Chatbot" component={ChatbotScreen} />
          <Stack.Screen name="SignLanguage" component={SignLanguageScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="TopicQuestions"
            component={TopicQuestionsScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
