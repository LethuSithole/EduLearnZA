import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://localhost:5000/api"; // Change to your backend URL

// For production/deployment, use:
// const API_URL = "https://your-backend-url.com/api";

export const api = {
  // Helper to get auth token
  async getToken() {
    try {
      return await AsyncStorage.getItem("authToken");
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  // Helper to set auth token
  async setToken(token) {
    try {
      await AsyncStorage.setItem("authToken", token);
    } catch (error) {
      console.error("Error setting token:", error);
    }
  },

  // Helper to remove auth token
  async removeToken() {
    try {
      await AsyncStorage.removeItem("authToken");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  },

  // Sign Up
  async signup(email, password, displayName, grade) {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, displayName, grade }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        await this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error("Signup API error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  },

  // Login
  async login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success && data.token) {
        await this.setToken(data.token);
      }

      return data;
    } catch (error) {
      console.error("Login API error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  },

  // Get Current User
  async getCurrentUser() {
    try {
      const token = await this.getToken();
      if (!token) {
        return { success: false, error: "No token found" };
      }

      const response = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get user API error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  },

  // Update Profile
  async updateProfile(displayName) {
    try {
      const token = await this.getToken();
      if (!token) {
        return { success: false, error: "No token found" };
      }

      const response = await fetch(`${API_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ displayName }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Update profile API error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  },

  // Update Grade
  async updateGrade(grade) {
    try {
      const token = await this.getToken();
      if (!token) {
        return { success: false, error: "No token found" };
      }

      const response = await fetch(`${API_URL}/auth/grade`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ grade }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Update grade API error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  },

  // Reset Password
  async resetPassword(email) {
    try {
      const response = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Reset password API error:", error);
      return { success: false, error: "Network error. Please try again." };
    }
  },

  // Logout
  async logout() {
    try {
      await this.removeToken();
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  },
};
