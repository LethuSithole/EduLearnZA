import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("theme");
      if (savedTheme) {
        setIsDarkMode(savedTheme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem("theme", newTheme ? "dark" : "light");
    } catch (error) {
      console.error("Error saving theme:", error);
    }
  };

  const theme = {
    // Colors
    background: isDarkMode ? "#121212" : "#f5f5f5",
    surface: isDarkMode ? "#1E1E1E" : "#FFFFFF",
    text: isDarkMode ? "#FFFFFF" : "#333333",
    textSecondary: isDarkMode ? "#B0B0B0" : "#666666",
    primary: "#6200EE",
    border: isDarkMode ? "#333333" : "#E0E0E0",
    inputBackground: isDarkMode ? "#2C2C2C" : "#f9f9f9",
    inputBorder: isDarkMode ? "#444444" : "#ddd",
    placeholderText: isDarkMode ? "#888888" : "#999",
    error: "#FF3B30",
    success: "#4CAF50",
    warning: "#FF9800",
    modalOverlay: "rgba(0, 0, 0, 0.7)",
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

export default ThemeContext;
