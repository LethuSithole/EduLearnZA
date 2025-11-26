import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import AsyncStorage from "@react-native-async-storage/async-storage";

class MediaService {
  constructor() {
    this.downloadDirectory = FileSystem.documentDirectory + "downloads/";
    this.initializeDownloadDirectory();
  }

  // Initialize download directory
  async initializeDownloadDirectory() {
    const dirInfo = await FileSystem.getInfoAsync(this.downloadDirectory);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(this.downloadDirectory, {
        intermediates: true,
      });
    }
  }

  // Mock video streaming URLs (in production, these would be real video URLs)
  getVideoUrl(videoId, subject, grade) {
    // Mock video URLs - replace with actual video hosting service URLs
    const mockVideos = {
      1: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      2: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      3: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      4: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      5: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    };

    return mockVideos[videoId] || mockVideos[1];
  }

  // Get document download URL
  getDocumentUrl(documentId, type, subject, grade, year, term) {
    // Mock document URLs - replace with actual document storage URLs
    const baseUrl = "https://www.education.gov.za/Portals/0/Documents/";

    // Generate mock URL based on parameters
    const filename = `${subject}_Grade${grade}_${term}_${year}_${type}.pdf`;
    return `${baseUrl}${filename}`;
  }

  // Download file with progress tracking
  async downloadFile(url, filename, onProgress) {
    try {
      const fileUri = this.downloadDirectory + filename;

      // Check if file already exists
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        return {
          success: true,
          uri: fileUri,
          message: "File already downloaded",
          alreadyExists: true,
        };
      }

      // Create download resumable
      const downloadResumable = FileSystem.createDownloadResumable(
        url,
        fileUri,
        {},
        (downloadProgress) => {
          const progress =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;

          if (onProgress) {
            onProgress({
              progress: progress * 100,
              downloaded: this.formatBytes(downloadProgress.totalBytesWritten),
              total: this.formatBytes(
                downloadProgress.totalBytesExpectedToWrite
              ),
            });
          }
        }
      );

      const result = await downloadResumable.downloadAsync();

      if (result) {
        // Save download record
        await this.saveDownloadRecord({
          filename,
          uri: result.uri,
          url,
          downloadedAt: new Date().toISOString(),
        });

        return {
          success: true,
          uri: result.uri,
          message: "Download completed successfully",
        };
      } else {
        throw new Error("Download failed");
      }
    } catch (error) {
      console.error("Download error:", error);
      return {
        success: false,
        error: error.message,
        message: "Download failed. Please try again.",
      };
    }
  }

  // Mock download for demo purposes (generates a sample file)
  async mockDownload(filename, type, onProgress) {
    try {
      const fileUri = this.downloadDirectory + filename;

      // Simulate download progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((resolve) => setTimeout(resolve, 200));
        if (onProgress) {
          onProgress({
            progress: i,
            downloaded: this.formatBytes((i / 100) * 2500000),
            total: this.formatBytes(2500000),
          });
        }
      }

      // Create a sample text file
      const content = this.generateMockContent(filename, type);
      await FileSystem.writeAsStringAsync(fileUri, content);

      // Save download record
      await this.saveDownloadRecord({
        filename,
        uri: fileUri,
        type,
        downloadedAt: new Date().toISOString(),
      });

      return {
        success: true,
        uri: fileUri,
        message: "Download completed successfully",
      };
    } catch (error) {
      console.error("Mock download error:", error);
      return {
        success: false,
        error: error.message,
        message: "Download failed. Please try again.",
      };
    }
  }

  // Generate mock content for different file types
  generateMockContent(filename, type) {
    const timestamp = new Date().toLocaleString();

    return `
EduLearnZA - ${type}
Filename: ${filename}
Downloaded: ${timestamp}

This is a demo file for EduLearnZA application.
In production, this would be the actual educational content.

${
  type === "Exam Paper"
    ? `
EXAMINATION PAPER

Instructions:
1. Answer ALL questions
2. Show all working
3. Total marks: 100
4. Time: 2 hours

[Questions would appear here]
`
    : type === "Memorandum"
    ? `
MEMORANDUM

Answer Key:
Question 1: A
Question 2: B
Question 3: C

[Detailed solutions would appear here]
`
    : type === "Study Guide"
    ? `
STUDY GUIDE

Table of Contents:
1. Introduction
2. Key Concepts
3. Examples
4. Practice Questions
5. Summary

[Study material would appear here]
`
    : `
EDUCATIONAL MATERIAL

Content for ${filename}
[Material content would appear here]
`
}

---
© EduLearnZA ${new Date().getFullYear()}
    `.trim();
  }

  // Save download record to AsyncStorage
  async saveDownloadRecord(record) {
    try {
      const downloads = await this.getDownloadHistory();
      downloads.push(record);
      await AsyncStorage.setItem("downloadHistory", JSON.stringify(downloads));
    } catch (error) {
      console.error("Error saving download record:", error);
    }
  }

  // Get download history
  async getDownloadHistory() {
    try {
      const history = await AsyncStorage.getItem("downloadHistory");
      return history ? JSON.parse(history) : [];
    } catch (error) {
      console.error("Error getting download history:", error);
      return [];
    }
  }

  // Check if file is downloaded
  async isFileDownloaded(filename) {
    try {
      const fileUri = this.downloadDirectory + filename;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      return fileInfo.exists;
    } catch (error) {
      console.error("Error checking file:", error);
      return false;
    }
  }

  // Open downloaded file
  async openFile(uri) {
    try {
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri);
        return { success: true };
      } else {
        return {
          success: false,
          message: "Sharing is not available on this device",
        };
      }
    } catch (error) {
      console.error("Error opening file:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Delete downloaded file
  async deleteFile(filename) {
    try {
      const fileUri = this.downloadDirectory + filename;
      await FileSystem.deleteAsync(fileUri);

      // Remove from download history
      const downloads = await this.getDownloadHistory();
      const updatedDownloads = downloads.filter((d) => d.filename !== filename);
      await AsyncStorage.setItem(
        "downloadHistory",
        JSON.stringify(updatedDownloads)
      );

      return { success: true };
    } catch (error) {
      console.error("Error deleting file:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get all downloaded files
  async getDownloadedFiles() {
    try {
      const files = await FileSystem.readDirectoryAsync(this.downloadDirectory);
      const fileDetails = await Promise.all(
        files.map(async (filename) => {
          const fileUri = this.downloadDirectory + filename;
          const info = await FileSystem.getInfoAsync(fileUri);
          return {
            filename,
            uri: fileUri,
            size: this.formatBytes(info.size),
            modificationTime: new Date(
              info.modificationTime * 1000
            ).toLocaleString(),
          };
        })
      );
      return fileDetails;
    } catch (error) {
      console.error("Error getting downloaded files:", error);
      return [];
    }
  }

  // Format bytes to human readable
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  // Stream video (returns URL for video player)
  async streamVideo(videoId, subject, grade) {
    try {
      const videoUrl = this.getVideoUrl(videoId, subject, grade);

      // In production, you might want to:
      // 1. Check user authentication
      // 2. Track viewing analytics
      // 3. Handle DRM if needed

      return {
        success: true,
        url: videoUrl,
        message: "Video ready to stream",
      };
    } catch (error) {
      console.error("Error streaming video:", error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  // Get video quality options
  getVideoQualities() {
    return [
      { label: "Auto", value: "auto" },
      { label: "1080p", value: "1080p" },
      { label: "720p", value: "720p" },
      { label: "480p", value: "480p" },
      { label: "360p", value: "360p" },
    ];
  }
}

export default new MediaService();
