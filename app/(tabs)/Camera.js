import { FontAwesome6 } from "@expo/vector-icons";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";
export default function Camera({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef(null);
  const [pic, setpic] = useState();
  const router = useRouter();
  _takePhoto = async () => {
    const photo = await ref.current.takePictureAsync();
    console.debug(photo);
    setpic(photo);
  };

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <FontAwesome6 name="arrows-rotate" size={27} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, { height: 80, width: 80 }]}
            onPress={_takePhoto}
          >
            <AntDesign name="camera" size={40} color="black" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.picViewer}
            // onPress={toggleCameraFacing}
            onPress={() =>
              router.push({
                pathname: "/(screens)/imageViewer",
                params: {
                  url: pic?.uri,
                },
              })
            }
          >
            <Image
              style={styles.image}
              source={pic?.uri}
              placeholder={{ blurhash }}
              contentFit="cover"
              transition={1000}
            />
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red",
  },
  button: {
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  picViewer: {
    height: 60,
    width: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 10,
    // backgroundColor: "#0553",
  },
});
