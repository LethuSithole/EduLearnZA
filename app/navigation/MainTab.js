import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import SubjectsScreen from "../screens/SubjectsScreen";
import ChatbotScreen from "../screens/ChatbotScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Subjects") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Chatbot") {
            iconName = focused
              ? "chatbubble-ellipses"
              : "chatbubble-ellipses-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          // Return emoji fallback if Ionicons doesn't load
          if (route.name === "Home")
            return <Text style={{ fontSize: 24 }}>🏠</Text>;
          if (route.name === "Subjects")
            return <Text style={{ fontSize: 24 }}>📚</Text>;
          if (route.name === "Chatbot")
            return <Text style={{ fontSize: 24 }}>🤖</Text>;
          if (route.name === "Profile")
            return <Text style={{ fontSize: 24 }}>👤</Text>;

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6200EE",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Subjects" component={SubjectsScreen} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
