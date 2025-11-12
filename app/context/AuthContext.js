import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Auth check error:", error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, displayName, grade) => {
    try {
      // Validate inputs
      if (password.length < 6) {
        return {
          success: false,
          error: "Password should be at least 6 characters",
        };
      }

      // Check if user already exists
      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      const userExists = users.find((u) => u.email === email);
      if (userExists) {
        return { success: false, error: "This email is already registered" };
      }

      // Create new user
      const newUser = {
        uid: Date.now().toString(),
        email,
        displayName,
        grade,
        password, // In production, this should be hashed
      };

      // Save to storage
      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = newUser;
      await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);

      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: "An error occurred during signup" };
    }
  };

  const login = async (email, password) => {
    try {
      // Get all users
      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // Find user
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        return { success: false, error: "Invalid email or password" };
      }

      // Set as current user (without password)
      const { password: _, ...userWithoutPassword } = user;
      await AsyncStorage.setItem("user", JSON.stringify(userWithoutPassword));
      setUser(userWithoutPassword);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An error occurred during login" };
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      // Get all users
      const existingUsers = await AsyncStorage.getItem("users");
      const users = existingUsers ? JSON.parse(existingUsers) : [];

      // Check if user exists
      const userExists = users.find((u) => u.email === email);

      if (!userExists) {
        return { success: false, error: "No account found with this email" };
      }

      // In a real app, you'd send an email here
      return {
        success: true,
        message: "Password reset instructions sent to your email",
      };
    } catch (error) {
      console.error("Password reset error:", error);
      return { success: false, error: "An error occurred" };
    }
  };

  const updateUserGrade = async (grade) => {
    try {
      if (user) {
        const updatedUser = { ...user, grade };
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        // Update in users list
        const existingUsers = await AsyncStorage.getItem("users");
        const users = existingUsers ? JSON.parse(existingUsers) : [];
        const userIndex = users.findIndex((u) => u.uid === user.uid);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], grade };
          await AsyncStorage.setItem("users", JSON.stringify(users));
        }
      }
    } catch (error) {
      console.error("Update grade error:", error);
    }
  };

  const updateUserProfile = async (displayName) => {
    try {
      if (user) {
        const updatedUser = { ...user, displayName };
        await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);

        // Update in users list
        const existingUsers = await AsyncStorage.getItem("users");
        const users = existingUsers ? JSON.parse(existingUsers) : [];
        const userIndex = users.findIndex((u) => u.uid === user.uid);
        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], displayName };
          await AsyncStorage.setItem("users", JSON.stringify(users));
        }

        return { success: true };
      }
      return { success: false, error: "No user logged in" };
    } catch (error) {
      console.error("Update profile error:", error);
      return { success: false, error: "Failed to update profile" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        resetPassword,
        updateUserGrade,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
