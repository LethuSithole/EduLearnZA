import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../context/ThemeContext";

export default function ChatbotScreen({ navigation }) {
  const { theme } = useTheme();
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! I'm your AI study assistant. How can I help you today? 📚",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    if (flatListRef.current && messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  const generateMockResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();

    // Mock responses based on keywords
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! I'm your AI study assistant. How can I help you with your studies today?";
    }
    if (lowerMessage.includes("math") || lowerMessage.includes("algebra")) {
      return "I can help you with Mathematics! Would you like tips on Algebra, Geometry, Calculus, or another topic?";
    }
    if (lowerMessage.includes("help")) {
      return "I'm here to help! You can ask me about:\n• Study tips\n• Subject explanations\n• Exam preparation\n• Practice questions\n\nWhat would you like to know?";
    }

    return "That's an interesting question! I'm currently in demo mode using offline responses. In the full version, I would provide detailed answers to help with your studies.";
  };

  const handleSend = () => {
    if (inputText.trim() === "") return;

    const userMessage = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate bot thinking and response
    setTimeout(() => {
      const botResponse = {
        id: (Date.now() + 1).toString(),
        text: generateMockResponse(inputText.trim()),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const renderMessage = ({ item }) => {
    const isBot = item.sender === "bot";

    return (
      <View
        style={[
          styles.messageContainer,
          isBot ? styles.botMessageContainer : styles.userMessageContainer,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isBot ? theme.surface : theme.primary,
              borderColor: isBot ? theme.border : theme.primary,
            },
          ]}
        >
          <Text
            style={[styles.messageText, { color: isBot ? theme.text : "#fff" }]}
          >
            {item.text}
          </Text>
          <Text
            style={[
              styles.timestamp,
              { color: isBot ? theme.textSecondary : "#fff" },
            ]}
          >
            {item.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={[styles.backButtonText, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.botIcon}>🤖</Text>
          <View>
            <Text style={[styles.headerTitle, { color: theme.text }]}>
              AI Study Assistant
            </Text>
            <Text
              style={[styles.headerSubtitle, { color: theme.textSecondary }]}
            >
              {isTyping ? "Typing..." : "Online"}
            </Text>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.chatContainer}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Messages List */}
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({ animated: true })
          }
        />

        {/* Typing Indicator */}
        {isTyping && (
          <View style={styles.typingContainer}>
            <View
              style={[
                styles.typingBubble,
                { backgroundColor: theme.surface, borderColor: theme.border },
              ]}
            >
              <ActivityIndicator size="small" color={theme.primary} />
              <Text style={[styles.typingText, { color: theme.textSecondary }]}>
                AI is thinking...
              </Text>
            </View>
          </View>
        )}

        {/* Input Area */}
        <View
          style={[styles.inputContainer, { backgroundColor: theme.surface }]}
        >
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: theme.background,
                color: theme.text,
                borderColor: theme.border,
              },
            ]}
            placeholder="Ask me anything..."
            placeholderTextColor={theme.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim()
                  ? theme.primary
                  : theme.border,
              },
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
          >
            <Text style={styles.sendButtonText}>
              {inputText.trim() ? "📤" : "✉️"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Quick Actions */}
      <View style={[styles.quickActions, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.quickButton, { backgroundColor: theme.background }]}
          onPress={() => setInputText("Help me with math")}
        >
          <Text style={[styles.quickButtonText, { color: theme.text }]}>
            📐 Math Help
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickButton, { backgroundColor: theme.background }]}
          onPress={() => setInputText("Study tips")}
        >
          <Text style={[styles.quickButtonText, { color: theme.text }]}>
            💡 Study Tips
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.quickButton, { backgroundColor: theme.background }]}
          onPress={() => setInputText("Exam preparation")}
        >
          <Text style={[styles.quickButtonText, { color: theme.text }]}>
            📝 Exam Prep
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  botIcon: {
    fontSize: 30,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 12,
  },
  placeholder: {
    width: 50,
  },
  chatContainer: {
    flex: 1,
  },
  messagesList: {
    padding: 20,
    paddingBottom: 10,
  },
  messageContainer: {
    marginBottom: 15,
  },
  botMessageContainer: {
    alignItems: "flex-start",
  },
  userMessageContainer: {
    alignItems: "flex-end",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 10,
    marginTop: 5,
    opacity: 0.7,
  },
  typingContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  typingBubble: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
    maxWidth: "60%",
  },
  typingText: {
    marginLeft: 10,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 15,
    paddingBottom: Platform.OS === "ios" ? 15 : 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 100,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    marginRight: 10,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sendButtonText: {
    fontSize: 20,
  },
  quickActions: {
    flexDirection: "row",
    padding: 10,
    gap: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quickButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 20,
    alignItems: "center",
    elevation: 2,
  },
  quickButtonText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
