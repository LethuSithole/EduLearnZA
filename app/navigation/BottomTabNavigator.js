import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import StudyMaterialsScreen from "../screens/StudyMaterialsScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import ProgressScreen from "../screens/ProgressScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();
const StudyStack = createNativeStackNavigator();

// Study Stack Navigator
function StudyStackNavigator() {
  return (
    <StudyStack.Navigator>
      <StudyStack.Screen
        name="StudyMaterials"
        component={StudyMaterialsScreen}
        options={{ headerShown: false }}
      />
      <StudyStack.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{ headerShown: false }}
      />
    </StudyStack.Navigator>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6200EE",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Study"
        component={StudyStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size }}>📚</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size }}>📊</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Text style={{ fontSize: size }}>👤</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
