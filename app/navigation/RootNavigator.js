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
import SubjectDetailsScreen from "../screens/SubjectDetailsScreen";
import TopicQuestionsScreen from "../screens/TopicQuestionsScreen";
import SignLanguageLearnScreen from "../screens/SignLanguageLearnScreen";
import QuizScreen from "../screens/QuizScreen";
import ResultScreen from "../screens/ResultScreen";
import AllSubjectsTestScreen from "../screens/AllSubjectsTestScreen";
import GradeSelectionScreen from "../screens/GradeSelectionScreen";

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
          <Stack.Screen
            name="SubjectDetails"
            component={SubjectDetailsScreen}
          />
          <Stack.Screen
            name="TopicQuestions"
            component={TopicQuestionsScreen}
          />
          <Stack.Screen
            name="SignLanguageLearn"
            component={SignLanguageLearnScreen}
          />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Result" component={ResultScreen} />
          <Stack.Screen
            name="AllSubjectsTest"
            component={AllSubjectsTestScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GradeSelection"
            component={GradeSelectionScreen}
            options={{ headerShown: false }}
          />
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
