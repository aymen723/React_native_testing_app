import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
// import { Image } from "expo-image";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export default function ImageViewer() {
  const { url } = useLocalSearchParams();
  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      console.log(e);
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = 1; // Reset scale after the gesture ends
    });

  const [pic, setpic] = useState();
  const [image, setImage] = useState(null);

  const scale = useSharedValue(1);
  useEffect(() => {
    console.log(url);
    setpic(url);
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setpic(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
      </View>

      <GestureDetector gesture={pinch}>
        <Animated.Image
          style={[styles.image]}
          source={{ uri: pic }}
          // placeholder={{ blurhash }}
          // contentFit="cover"
          // transition={1000}
        />
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "60%",
    // backgroundColor: "#0553",
  },
  header: {
    borderWidth: 1,
    borderColor: "red",
    width: "100%",
    height: "20%",
    alignItems: "center",
  },
});

// <Animated.View
//   style={{
//     width: "100%",
//     height: "80%",
//     borderWidth: 1,
//     borderColor: "red",
//   }}
// >
