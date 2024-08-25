import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import Geolocation from "@react-native-community/geolocation";
// import * as Updates from "expo-updates";
// import PerformanceStats from "react-native-performance-stats";
const index = () => {
  const [position, setPosition] = useState(null);
  const [watchId, setWatchId] = useState(null);

  // const { currentlyRunning, isUpdateAvailable, isUpdatePending } =
  //   Updates.useUpdates();

  useEffect(() => {
    // if (isUpdatePending) {
    //   // Update has successfully downloaded; apply it now
    //   Updates.reloadAsync();
    // }
    // Start watching the position when the component mounts
    const id = Geolocation.watchPosition(
      (position) => {
        setPosition(position);
        console.log("Position updated:", position);
      },
      (error) => {
        console.log("Error watching position:", error.message);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 5000, // Update every 5 seconds
        fastestInterval: 2000, // Minimum update interval of 2 seconds
      }
    );

    // const listener = PerformanceStats.addListener((stats) => {
    //   console.log(stats);
    // });

    // // you must call .start(true) to get CPU as well
    // PerformanceStats.start();

    // // ... at some later point you could call:
    // // PerformanceStats.stop();

    // return () => listener.remove();
    setWatchId(id);

    // const showDownloadButton = isUpdateAvailable;

    // const runTypeMessage = currentlyRunning.isEmbeddedLaunch
    //   ? "This app is running from built-in code"
    //   : "This app is running an update";

    return () => {
      if (watchId !== null) {
        Geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>index App</Text>
      <Text>Latitude: {position?.coords?.latitude}</Text>
      <Text>Longitude: {position?.coords?.longitude}</Text>
      <Text>Altitude: {position?.coords?.altitude}</Text>
      <Text>Accuracy: {position?.coords?.accuracy}</Text>
      <Button
        title="start Watching Position"
        onPress={() => {
          console.log("here");
          const id = Geolocation.watchPosition(
            (position) => {
              setPosition(position);
              console.log("Position updated:", position);
            },
            (error) => {
              console.log("Error watching position:", error.message);
            },
            {
              enableHighAccuracy: true,
              distanceFilter: 10,
              interval: 5000, // Update every 5 seconds
              fastestInterval: 2000, // Minimum update interval of 2 seconds
            }
          );

          setWatchId(id);
        }}
      />
      <Button
        title="Stop Watching Position"
        onPress={() => {
          if (watchId !== null) {
            Geolocation.clearWatch(watchId);
            console.log("Stopped watching position");
          }
        }}
      />

      {/* <View>
        <Button
          title="start reccording performance"
          onPress={() => {
            PerformanceStats.start();
          }}
        ></Button>
        <Button
          title="stop reccording performance"
          onPress={() => {
            PerformanceStats.stop();
          }}
        ></Button>
      </View> */}
      {/* <View>
        <Text>Updates Demo</Text>
        <Text>{runTypeMessage}</Text>
        <Button
          onPress={() => Updates.checkForUpdateAsync()}
          title="Check manually for updates"
        />
        {showDownloadButton ? (
          <Button
            onPress={() => Updates.fetchUpdateAsync()}
            title="Download and run update"
          />
        ) : null}
      </View> */}
    </View>
  );
};

export default index;
