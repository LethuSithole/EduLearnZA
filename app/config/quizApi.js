import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "https://edulearnza.onrender.com/api";

// -----------------------------------------------------
// TOKEN HANDLING
// -----------------------------------------------------
export const quizApi = {
  async getToken() {
    try {
      return await AsyncStorage.getItem("userToken");
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  },

  async setToken(token) {
    try {
      await AsyncStorage.setItem("userToken", token);
    } catch (error) {
      console.error("Error setting token:", error);
    }
  },
};

// -----------------------------------------------------
// REUSABLE FETCH WRAPPER (Silent mode for offline)
// -----------------------------------------------------
const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = await quizApi.getToken();

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      throw new Error(`API_OFFLINE`);
    }

    return await res.json();
  } catch (error) {
    // Silent fail - let caller handle it
    throw error;
  }
};

// -----------------------------------------------------
// GET QUESTIONS
// -----------------------------------------------------
export const fetchQuestionsByTopic = async (subject, topic, limit = 100) => {
  return apiRequest(
    `/questions?subject=${encodeURIComponent(
      subject
    )}&topic=${encodeURIComponent(topic)}&limit=${limit}`
  );
};

// -----------------------------------------------------
// GET SUBJECTS
// -----------------------------------------------------
export const fetchAllSubjects = async () => {
  return apiRequest(`/subjects`);
};

// -----------------------------------------------------
// GET TOPICS FOR SUBJECT
// -----------------------------------------------------
export const fetchTopicsBySubject = async (subject) => {
  return apiRequest(`/topics?subject=${encodeURIComponent(subject)}`);
};

// -----------------------------------------------------
// SUBMIT QUIZ RESULT (Silent fail for offline)
// -----------------------------------------------------
export const submitQuizResult = async (
  userId,
  subject,
  topic,
  score,
  totalQuestions,
  answers
) => {
  try {
    return await apiRequest(`/results`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        subject,
        topic,
        score,
        totalQuestions,
        answers,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (error) {
    // Save to local storage for later sync
    try {
      const pendingResults = await AsyncStorage.getItem("pendingResults");
      const results = pendingResults ? JSON.parse(pendingResults) : [];
      results.push({
        userId,
        subject,
        topic,
        score,
        totalQuestions,
        answers,
        timestamp: new Date().toISOString(),
      });
      await AsyncStorage.setItem("pendingResults", JSON.stringify(results));
      console.log("✅ Result saved locally for later sync");
    } catch (storageError) {
      console.log("⚠️ Could not save result locally");
    }
    // Return success anyway
    return { success: true, offline: true };
  }
};

// -----------------------------------------------------
// GET USER PROGRESS
// -----------------------------------------------------
export const fetchUserProgress = async (userId) => {
  try {
    return await apiRequest(`/progress/${userId}`);
  } catch (error) {
    // Return empty progress if offline
    return [];
  }
};

// -----------------------------------------------------
// BACKWARD COMPATIBILITY ALIAS
// -----------------------------------------------------
export const submitTestAnswers = submitQuizResult;
