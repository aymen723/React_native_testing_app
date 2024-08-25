import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
} from "react-native";
import * as Device from "expo-device";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import NetInfo from "@react-native-community/netinfo";
import { Notifier, Easing } from "react-native-notifier";
import { useLocationStore } from "../../hooks/background";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import * as SecureStore from "expo-secure-store";

const LOCATION_TASK_NAME = "background-location-task";
const LOCATION_INTERVAL = 10000; // 10 seconds
async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert("No values stored under that key.");
  }
}
async function testtoken() {
  const value =
    "TleV?zOQk53emY4ZLP,m(Fqydj.6{wz9}h29(:bb:[Zx.wwLYxr-=vreLMk?C9'80gLlM*f!s0ISw0.,TL@|}vRggl9{3!*x(0i/h19V|-|x1;S9dL]2";
  await SecureStore.setItemAsync("token", value);
}

export default function App() {
  // const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [Type, setType] = useState();
  const [isconnected, setconnected] = useState();
  const [state, setstate] = useState(false);
  const [key, onChangeKey] = React.useState("");
  const [value, onChangeValue] = React.useState("");

  const { setLocation, inc, loc, count } = useLocationStore();

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setType(state.type);
      setconnected(state.isConnected);
    });

    ReactNativeForegroundService.add_task(() => log(), {
      delay: 5000,
      onLoop: true,
      taskId: "taskid",
      onError: (e) => console.log(`Error logging:`, e),
    });
  }, []);

  const log = async () => {
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    setLocation(location);
    inc();
  };

  const startTask = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    ReactNativeForegroundService.start({
      id: 1244,
      title: "Foreground Service",
      message: "counter " + count,
      icon: "ic_launcher",
      button: true,
      button2: true,
      buttonText: "test1",
      button2Text: "test2",
      buttonOnPress: "cray",
      setOnlyAlertOnce: true,
      color: "#000000",
    });
  };

  const stopTask = () => {
    ReactNativeForegroundService.stopAll();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.item}>
          <Text style={{ fontWeight: "bold" }}>
            the task : Expo secure Store for encrypting the data stored
          </Text>
          <Text style={styles.paragraph}>Save an item, and grab it later!</Text>
          <TextInput
            style={styles.textInput}
            clearTextOnFocus
            onChangeText={(text) => onChangeKey(text)}
            value={key}
            placeholder="Your key here"
          />
          <TextInput
            style={styles.textInput}
            clearTextOnFocus
            placeholder="Your value here"
            onChangeText={(text) => onChangeValue(text)}
            value={value}
          />

          <Button
            title="Save this key/value pair"
            onPress={() => {
              save(key, value);
              // onChangeKey("Your key here");
              // onChangeValue("Your value here");
            }}
          />
          <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
          <TextInput
            style={styles.textInput}
            onSubmitEditing={(event) => {
              getValueFor(event.nativeEvent.text);
            }}
            placeholder="Enter the key for the value you want to get"
          />

          <View style={styles.tokentestView}>
            <Text>test with defined value</Text>
            <Button
              title="ecrytpe the token"
              onPress={() => {
                testtoken();
              }}
            ></Button>

            <Button
              title="see the token"
              onPress={() => {
                getValueFor("token");
              }}
            ></Button>
          </View>
        </View>
        <View style={styles.item}>
          <Text>netinfo</Text>
          <Text>Connection type</Text>
          <Text>{Type ? Type : null}</Text>

          <View>
            <Text>Is connected ?</Text>
            {isconnected ? <Text>true</Text> : <Text>false</Text>}
          </View>
        </View>

        <View style={styles.item}>
          <Text style={{ fontWeight: "bold" }}>
            The foreground location update
          </Text>

          <Button onPress={startTask} title="Start The foreground Service" />
          <Button onPress={stopTask} title="Stop The foreground Service" />
          <Text>
            the location from the foreground service {JSON.stringify(loc)}
          </Text>
          <View>
            <Text>counter of the updated location {count}</Text>
          </View>
          <Button
            title="foreground"
            onPress={() => {
              console.log("foreground location", loc);
              console.log("counter location", count);
            }}
          ></Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
  item: {
    marginTop: 10,
    width: "100%",
    height: 350,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  paragraph: {
    marginTop: 34,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  textInput: {
    height: 35,
    borderColor: "gray",
    borderWidth: 0.5,
    padding: 4,
    width: "60%",
    backgroundColor: "lightgray",
  },
  tokentestView: {
    height: 150,
    width: "100%",
    // justifyContent: "center",
    alignItems: "center",
  },
});
