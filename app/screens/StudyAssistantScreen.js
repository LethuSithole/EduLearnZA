import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Linking,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";
import { getGeminiResponse } from "../services/geminiService";
import { searchEducationalVideos } from "../services/youtubeService";

export default function ChatbotScreen({ navigation }) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("chat");
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: "ai",
      content:
        "👋 Hi! I'm your AI Study Assistant powered by Google Gemini. Ask me anything about your subjects, homework, or study tips!",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loadingVideos, setLoadingVideos] = useState(false);
  const scrollViewRef = useRef();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message.trim(),
      timestamp: new Date(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    const userQuery = message.trim();
    setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    try {
      const aiResponse = await getGeminiResponse(userQuery, chatHistory);

      const aiMessage = {
        id: Date.now() + 1,
        type: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage = {
        id: Date.now() + 1,
        type: "ai",
        content:
          "😔 Sorry, I'm having trouble connecting right now. Please check your internet connection and try again.",
        timestamp: new Date(),
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const handleSearchVideos = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Please enter a search term");
      return;
    }

    setLoadingVideos(true);
    try {
      const results = await searchEducationalVideos(searchQuery);
      setVideos(results);
    } catch (error) {
      console.error("Error searching videos:", error);
      Alert.alert(
        "Error",
        "Failed to search videos. Please check your internet connection."
      );
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleVideoPress = (videoId) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    Linking.openURL(url);
  };

  const renderChatMessage = ({ item }) => {
    const isAI = item.type === "ai";

    return (
      <View
        style={[
          styles.messageContainer,
          isAI ? styles.aiMessageContainer : styles.userMessageContainer,
        ]}
      >
        {isAI && (
          <View
            style={[styles.avatarContainer, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.avatarText}>🤖</Text>
          </View>
        )}
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isAI ? theme.surface : theme.primary,
            },
          ]}
        >
          <Text
            style={[styles.messageText, { color: isAI ? theme.text : "#fff" }]}
          >
            {item.content}
          </Text>
          <Text
            style={[
              styles.timestamp,
              { color: isAI ? theme.textSecondary : "#ffffff99" },
            ]}
          >
            {item.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        {!isAI && (
          <View
            style={[styles.avatarContainer, { backgroundColor: "#4ECDC4" }]}
          >
            <Text style={styles.avatarText}>👤</Text>
          </View>
        )}
      </View>
    );
  };

  const renderVideoCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.videoCard, { backgroundColor: theme.surface }]}
      onPress={() => handleVideoPress(item.videoId)}
    >
      <Image
        source={{ uri: item.thumbnail }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <View style={styles.playIconOverlay}>
        <Text style={styles.playIcon}>▶️</Text>
      </View>
      <View style={styles.videoInfo}>
        <Text
          style={[styles.videoTitle, { color: theme.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text style={[styles.channelName, { color: theme.textSecondary }]}>
          {item.channelTitle}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const suggestedTopics = [
    "📐 Algebra help",
    "🔬 Science experiments",
    "📚 Essay writing tips",
    "⚡ Physics formulas",
    "🧮 Calculus basics",
    "🌍 Geography tips",
  ];

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          🎓 Study Assistant
        </Text>
        <Text style={[styles.headerSubtitle, { color: theme.textSecondary }]}>
          Powered by Google Gemini AI
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabsContainer, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "chat" && [
              styles.activeTab,
              { backgroundColor: theme.primary },
            ],
          ]}
          onPress={() => setActiveTab("chat")}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "chat" ? "#fff" : theme.text },
            ]}
          >
            💬 AI Chat
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === "videos" && [
              styles.activeTab,
              { backgroundColor: theme.primary },
            ],
          ]}
          onPress={() => setActiveTab("videos")}
        >
          <Text
            style={[
              styles.tabText,
              { color: activeTab === "videos" ? "#fff" : theme.text },
            ]}
          >
            📺 Videos
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      {activeTab === "chat" ? (
        <KeyboardAvoidingView
          style={styles.chatContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={90}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.chatScrollView}
            contentContainerStyle={styles.chatContent}
          >
            {chatHistory.map((item) => (
              <View key={item.id}>{renderChatMessage({ item })}</View>
            ))}

            {isTyping && (
              <View
                style={[styles.messageContainer, styles.aiMessageContainer]}
              >
                <View
                  style={[
                    styles.avatarContainer,
                    { backgroundColor: theme.primary },
                  ]}
                >
                  <Text style={styles.avatarText}>🤖</Text>
                </View>
                <View
                  style={[
                    styles.messageBubble,
                    { backgroundColor: theme.surface },
                  ]}
                >
                  <View style={styles.typingIndicator}>
                    <View
                      style={[
                        styles.typingDot,
                        { backgroundColor: theme.primary },
                      ]}
                    />
                    <View
                      style={[
                        styles.typingDot,
                        { backgroundColor: theme.primary },
                      ]}
                    />
                    <View
                      style={[
                        styles.typingDot,
                        { backgroundColor: theme.primary },
                      ]}
                    />
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {chatHistory.length === 1 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.suggestionsContainer}
            >
              {suggestedTopics.map((topic, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.suggestionChip,
                    { backgroundColor: theme.surface },
                  ]}
                  onPress={() =>
                    setMessage(topic.split(" ").slice(1).join(" "))
                  }
                >
                  <Text style={[styles.suggestionText, { color: theme.text }]}>
                    {topic}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          <View
            style={[styles.inputContainer, { backgroundColor: theme.surface }]}
          >
            <TextInput
              style={[styles.input, { color: theme.text }]}
              placeholder="Ask me anything..."
              placeholderTextColor={theme.textSecondary}
              value={message}
              onChangeText={setMessage}
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                {
                  backgroundColor: message.trim()
                    ? theme.primary
                    : theme.surface,
                },
              ]}
              onPress={handleSendMessage}
              disabled={!message.trim()}
            >
              <Text style={styles.sendButtonText}>➤</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.videosContainer}>
          <View
            style={[styles.searchContainer, { backgroundColor: theme.surface }]}
          >
            <TextInput
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search educational videos..."
              placeholderTextColor={theme.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearchVideos}
            />
            <TouchableOpacity
              style={[styles.searchButton, { backgroundColor: theme.primary }]}
              onPress={handleSearchVideos}
            >
              <Text style={styles.searchButtonText}>🔍</Text>
            </TouchableOpacity>
          </View>

          {loadingVideos ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
              <Text
                style={[styles.loadingText, { color: theme.textSecondary }]}
              >
                Searching YouTube...
              </Text>
            </View>
          ) : videos.length > 0 ? (
            <FlatList
              data={videos}
              renderItem={renderVideoCard}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.videosList}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📺</Text>
              <Text style={[styles.emptyText, { color: theme.text }]}>
                Search for educational videos
              </Text>
              <Text
                style={[styles.emptySubtext, { color: theme.textSecondary }]}
              >
                Try: "Grade 12 Algebra", "Physics experiments", "Essay writing"
              </Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    padding: 10,
    gap: 10,
  },
  tab: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  activeTab: {
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  chatContainer: {
    flex: 1,
  },
  chatScrollView: {
    flex: 1,
  },
  chatContent: {
    padding: 15,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "flex-end",
  },
  aiMessageContainer: {
    justifyContent: "flex-start",
  },
  userMessageContainer: {
    justifyContent: "flex-end",
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  avatarText: {
    fontSize: 18,
  },
  messageBubble: {
    maxWidth: "70%",
    padding: 12,
    borderRadius: 16,
    elevation: 1,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 11,
    marginTop: 5,
  },
  typingIndicator: {
    flexDirection: "row",
    gap: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  suggestionsContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  suggestionChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },
  suggestionText: {
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 12,
    elevation: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  sendButtonText: {
    fontSize: 20,
    color: "#fff",
  },
  videosContainer: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    padding: 12,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 15,
  },
  searchButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  searchButtonText: {
    fontSize: 20,
  },
  videosList: {
    padding: 15,
  },
  videoCard: {
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
  },
  thumbnail: {
    width: "100%",
    height: 180,
  },
  playIconOverlay: {
    position: "absolute",
    top: 70,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  playIcon: {
    fontSize: 48,
  },
  videoInfo: {
    padding: 15,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  channelName: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});
