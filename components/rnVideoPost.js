// import {
//   StyleSheet,
//   Text,
//   View,
//   Pressable,
//   useWindowDimensions,
//   ActivityIndicator,
// } from "react-native";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import Video from "react-native-video";
// import { LinearGradient } from "expo-linear-gradient";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useFocusEffect } from "expo-router";
// const RNVideoPost = ({ post, activePostId }) => {
//   const videoRef = useRef(null);
//   const { height } = useWindowDimensions();
//   const [isBuffering, setIsBuffering] = useState(true); // Buffering state
//   const [isPlaying, setIsPlaying] = useState(true); // Playing state
//   useFocusEffect(
//     useCallback(() => {
//       if (!videoRef.current) {
//         return;
//       }
//       // Screen is focused, you can start the video or any other action
//       videoRef.current?.resume();
//       setIsPlaying(true);
//       return () => {
//         // Screen is unfocused, you can pause the video or any other action
//         videoRef.current?.pause();
//         setIsPlaying(true);
//       };
//     }, [])
//   );

//   const onBuffer = ({ isBuffering }) => {
//     console.log("video buffer", isBuffering);
//     setIsBuffering(isBuffering);
//   };
//   const onError = (error) => {
//     console.error("Video playback error:", error);
//   };

//   const onEnd = () => {
//     videoRef.current.seek(0); // Replay the video from the beginning if it ends
//   };

//   const onPress = () => {
//     if (isPlaying) {
//       videoRef.current.pause();
//     } else {
//       videoRef.current.resume();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   useEffect(() => {
//     if (!videoRef.current) {
//       return;
//     }
//     // if (activePostId !== post.id) {
//     //   videoRef.current.pause();
//     //   setIsPlaying(false);
//     // }
//     // if (activePostId === post.id) {
//     //   videoRef.current.resume();
//     //   setIsPlaying(true);
//     // }
//   }, [activePostId, videoRef.current]);

//   const bufferConfig = {
//     minBufferMs: 5000, // Minimum amount of data (in ms) to buffer before starting playback
//     maxBufferMs: 15000, // Maximum amount of data (in ms) to buffer during playback
//     bufferForPlaybackMs: 2500, // Amount of data (in ms) to buffer before resuming playback after a buffer
//     bufferForPlaybackAfterRebufferMs: 5000, // Amount of data (in ms) to buffer after a rebuffer (e.g., when network conditions improve)
//     cacheSizeMB: 500,
//   };

//   return (
//     <View style={[styles.container, { height: height - 21 }]}>
//       <Video
//         // Can be a URL or a local file.
//         source={{
//           uri: post.video,
//         }}
//         // Store reference
//         ref={videoRef}
//         // Callback when remote video is buffering
//         onBuffer={onBuffer}
//         // Callback when video cannot be loaded
//         onError={onError}
//         style={[StyleSheet.absoluteFill, styles.video]}
//         // fullscreen={true}
//         resizeMode="cover"
//         onEnd={onEnd} // Handle video end event
//         controls={true}
//         bufferConfig={bufferConfig} // Adding bufferConfig prop
//       />

//       {isBuffering && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="large" color="#fff" />
//           {/* You can replace this with a custom loading animation */}
//           <Text style={styles.loadingText}>Loading...</Text>
//         </View>
//       )}

//       {/* <Pressable onPress={onPress} style={styles.content}>
//         <LinearGradient
//           colors={["transparent", "rgba(0,0,0,0.8)"]}
//           style={[StyleSheet.absoluteFillObject, styles.overlay]}
//         />

//         <SafeAreaView style={{ flex: 1 }}>
//           <View style={styles.footer}>
//             <View style={styles.leftColumn}>
//               <Text style={styles.caption}>{post.caption}</Text>
//             </View>
//           </View>
//         </SafeAreaView>
//       </Pressable> */}
//     </View>
//   );
// };

// export default RNVideoPost;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     // alignItems: "center",
//   },
//   content: {
//     flex: 1,
//     justifyContent: "center",
//   },
//   video: {
//     borderWidth: 1,
//     borderColor: "red",
//   },
//   overlay: {
//     top: "50%",
//   },
//   footer: {
//     marginTop: "auto",
//     flexDirection: "row",
//     alignItems: "flex-end",
//   },
//   leftColumn: {
//     flex: 1,
//   },
//   caption: {
//     color: "white",
//     fontSize: 18,
//   },
//   rightColumn: {
//     gap: 10,
//   },
//   loadingText: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "white",
//   },
//   loadingContainer: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "red",
//     zIndex: 10,
//   },
// });

import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import Video from "react-native-video";
import { useFocusEffect } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const RNVideoPost = React.memo(({ post, activePostId }) => {
  const videoRef = useRef(null);
  const { height } = useWindowDimensions();
  const [isBuffering, setIsBuffering] = useState(true); // Buffering state
  const [isPlaying, setIsPlaying] = useState(true); // Playing state

  useFocusEffect(
    useCallback(() => {
      if (!videoRef.current) {
        return;
      }

      // Start video playback when the screen is focused
      videoRef.current?.resume();
      setIsPlaying(true);

      return () => {
        // Pause video playback when the screen is unfocused
        videoRef.current?.pause();
        setIsPlaying(false);
      };
    }, [])
  );

  const onBuffer = ({ isBuffering }) => {
    console.log("video buffer", isBuffering);
    setIsBuffering(isBuffering);
  };

  const onError = (error) => {
    console.error("Video playback error:", error);
  };

  const onEnd = () => {
    videoRef.current.seek(0); // Replay the video from the beginning if it ends
  };

  const bufferConfig = {
    minBufferMs: 5000,
    maxBufferMs: 15000,
    bufferForPlaybackMs: 2500,
    bufferForPlaybackAfterRebufferMs: 5000,
  };

  return (
    <View style={[styles.container, { height: height - 21 }]}>
      <Video
        source={{
          uri: post.video,
        }}
        ref={videoRef}
        onBuffer={onBuffer}
        onError={onError}
        style={[StyleSheet.absoluteFill, styles.video]}
        resizeMode="cover"
        onEnd={onEnd}
        controls={true}
        bufferConfig={bufferConfig}
      />

      {isBuffering && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}

      <SafeAreaView style={styles.content}>
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={[StyleSheet.absoluteFillObject, styles.overlay]}
        />
        <View style={styles.footer}>
          <View style={styles.leftColumn}>
            <Text style={styles.caption}>{post.caption}</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
});

export default RNVideoPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  video: {
    borderWidth: 1,
    borderColor: "red",
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
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});
