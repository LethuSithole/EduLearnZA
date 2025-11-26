import AsyncStorage from "@react-native-async-storage/async-storage";

// Comment out or remove actual API calls, keep only mock implementations

class AuthService {
  // Use ONLY mock implementation
  async sendPasswordResetEmail(email) {
    return await this.sendPasswordResetEmailMock(email);
  }

  async resetPassword(email, newPassword) {
    return await this.resetPasswordMock(email, newPassword);
  }

  // Mock implementation for demo (remove this when you have a real API)
  async sendPasswordResetEmailMock(email) {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if email exists in storage (for demo purposes)
    const users = await AsyncStorage.getItem("users");
    const usersList = users ? JSON.parse(users) : [];
    const userExists = usersList.some((user) => user.email === email);

    if (userExists) {
      // Generate a mock token
      const resetToken = `reset_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Store reset token (in real app, this would be on the server)
      await AsyncStorage.setItem(
        `reset_token_${email}`,
        JSON.stringify({
          token: resetToken,
          expiry: Date.now() + 3600000, // 1 hour
        })
      );

      return {
        success: true,
        message: "Password reset instructions sent to your email",
        token: resetToken, // Only for demo purposes
      };
    } else {
      return {
        success: false,
        error: "No account found with this email address",
      };
    }
  }

  // Mock reset password (for demo)
  async resetPasswordMock(email, newPassword) {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const users = await AsyncStorage.getItem("users");
      const usersList = users ? JSON.parse(users) : [];

      const userIndex = usersList.findIndex((user) => user.email === email);

      if (userIndex !== -1) {
        usersList[userIndex].password = newPassword;
        await AsyncStorage.setItem("users", JSON.stringify(usersList));

        // Clear reset token
        await AsyncStorage.removeItem(`reset_token_${email}`);

        return {
          success: true,
          message: "Password updated successfully",
        };
      } else {
        return {
          success: false,
          error: "User not found",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to update password",
      };
    }
  }
}

export default new AuthService();
