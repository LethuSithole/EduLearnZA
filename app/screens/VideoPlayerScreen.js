import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Video, ResizeMode } from "expo-av";
import { useTheme } from "../context/ThemeContext";

export default function VideoPlayerScreen({ navigation, route }) {
  const { videoUrl, title, subject, grade } = route.params || {};
  const { theme } = useTheme();
  const videoRef = useRef(null);

  const [status, setStatus] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handlePlayPause = async () => {
    if (videoRef.current) {
      if (isPlaying) {
        await videoRef.current.pauseAsync();
      } else {
        await videoRef.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (millis) => {
    const totalSeconds = Math.floor(millis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.surface }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.backButton, { color: theme.primary }]}>
            ← Back
          </Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            {subject?.name} • Grade {grade}
          </Text>
        </View>
      </View>

      <View style={styles.videoContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.primary} />
            <Text style={[styles.loadingText, { color: theme.text }]}>
              Loading video...
            </Text>
          </View>
        )}

        <Video
          ref={videoRef}
          source={{ uri: videoUrl }}
          style={styles.video}
          useNativeControls={true}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={false}
          onPlaybackStatusUpdate={(status) => {
            setStatus(status);
            if (status.isLoaded && isLoading) {
              setIsLoading(false);
            }
            if (status.isLoaded) {
              setIsPlaying(status.isPlaying);
            }
          }}
          onLoad={() => setIsLoading(false)}
        />
      </View>

      <View style={[styles.controls, { backgroundColor: theme.surface }]}>
        <View style={styles.infoContainer}>
          <Text style={[styles.timeText, { color: theme.text }]}>
            {status.positionMillis ? formatTime(status.positionMillis) : "0:00"}
          </Text>
          <Text style={[styles.separator, { color: theme.textSecondary }]}>
            {" "}
            /{" "}
          </Text>
          <Text style={[styles.timeText, { color: theme.text }]}>
            {status.durationMillis ? formatTime(status.durationMillis) : "0:00"}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.controlButton, { backgroundColor: theme.primary }]}
            onPress={handlePlayPause}
          >
            <Text style={styles.controlButtonText}>
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.note, { color: theme.textSecondary }]}>
          Use native video controls for playback
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    elevation: 4,
  },
  backButton: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  headerInfo: {
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
  },
  videoContainer: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
  },
  controls: {
    padding: 20,
    elevation: 4,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    fontWeight: "600",
  },
  separator: {
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  controlButton: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
    elevation: 3,
  },
  controlButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  note: {
    fontSize: 12,
    textAlign: "center",
    fontStyle: "italic",
  },
});
