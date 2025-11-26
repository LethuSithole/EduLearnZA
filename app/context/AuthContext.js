import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error checking user:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Simulate login - replace with actual API call
      const userData = {
        id: "1",
        name: "Test User",
        email: email,
        grade: "12",
      };

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "Login failed" };
    }
  };

  const signup = async (email, password, name, grade) => {
    try {
      // Simulate signup - replace with actual API call
      const userData = {
        id: Date.now().toString(),
        name: name,
        email: email,
        grade: grade,
      };

      await AsyncStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: "Signup failed" };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUser = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.error("Update user error:", error);
      return { success: false, error: "Update failed" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
