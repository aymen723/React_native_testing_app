import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode, AVPlaybackStatus } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef, useState } from "react";

const VideoPost = ({ post, activePostId }) => {
  const video = useRef(null);
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const isPlaying = status?.isLoaded && status.isPlaying;
  console.log(status);

  const { height } = useWindowDimensions();

  useEffect(() => {
    if (!video.current) {
      return;
    }
    if (activePostId !== post.id) {
      video.current.pauseAsync();
    }
    if (activePostId === post.id) {
      video.current.playAsync();
    }

    return () => {
      // Ensure video is unloaded when the component is unmounted
      console.log("here unloaded");
      video.current?.unloadAsync().catch((err) => {
        console.warn("Error unloading video:", err);
      });
    };
  }, [activePostId, video.current]);

  const handlePlaybackError = (error) => {
    console.warn("Video playback error:", error);
    setError("Failed to load video.");
    setIsLoading(false);
  };

  const handlePlaybackStatus = (status) => {
    setStatus(status);
    setIsLoading(!status.isLoaded); // Update loading state based on video status
    if (status.didJustFinish) {
      video.current?.setPositionAsync(0); // Reset to the beginning when finished
    }
  };

  const onPress = () => {
    if (!video.current) {
      return;
    }

    // video.current.loadAsync({
    //   uri: post.video,
    //   initialStatus: { androidImplementation: "MediaPlayer" },
    // });

    if (isPlaying) {
      video.current.pauseAsync();
    } else {
      video.current.playAsync();
    }
  };

  return (
    <View style={[styles.container, { height: height - 20 }]}>
      {isLoading && (
        <ActivityIndicator
          size="large"
          color="#ffffff"
          style={styles.loadingIndicator}
        />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {!error && (
        <Video
          ref={video}
          style={[StyleSheet.absoluteFill, styles.video]}
          source={{ uri: post.video }}
          resizeMode={ResizeMode.COVER}
          rate={1.0}
          volume={1.0}
          onPlaybackStatusUpdate={handlePlaybackStatus}
          isLooping
          onError={handlePlaybackError}
        />
      )}

      <Pressable onPress={onPress} style={styles.content}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        {!isPlaying && (
          <Ionicons
            style={{ position: "absolute", alignSelf: "center", top: "50%" }}
            name="play"
            size={70}
            color="rgba(255, 255, 255, 0.6)"
          />
        )}
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.footer}>
            {/* bottom: caption */}
            <View style={styles.leftColumn}>
              <Text style={styles.caption}>{post.caption}</Text>
            </View>
          </View>
        </SafeAreaView>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  video: {},
  content: {
    flex: 1,
    padding: 10,
  },
  overlay: {
    top: "50%",
  },
  footer: {
    marginTop: "auto",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  leftColumn: {
    flex: 1,
  },
  caption: {
    color: "white",
    fontSize: 18,
  },
  rightColumn: {
    gap: 10,
  },
});

export default VideoPost;
