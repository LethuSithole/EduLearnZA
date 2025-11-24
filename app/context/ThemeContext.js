import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  const lightTheme = {
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    primary: "#6200EE",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#F44336",
    border: "#e0e0e0",
  };

  const darkTheme = {
    background: "#121212",
    surface: "#1E1E1E",
    text: "#FFFFFF",
    textSecondary: "#B3B3B3",
    primary: "#BB86FC",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#CF6679",
    border: "#2C2C2C",
  };

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const setTheme = (newTheme) => {
    // Allow custom theme override if needed
    if (typeof newTheme === "object") {
      return newTheme;
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
