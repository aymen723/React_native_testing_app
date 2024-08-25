import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Location",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={20}
              style={{ marginBottom: -3 }}
              name="home"
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "search",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={20}
              style={{ marginBottom: -3 }}
              name="book"
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Camera"
        options={{
          title: "Camera",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={20}
              style={{ marginBottom: -3 }}
              name="camera"
              color={color}
            />
          ),
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="Videos"
        options={{
          title: "Videos",
          tabBarIcon: ({ color }) => (
            <FontAwesome
              size={20}
              style={{ marginBottom: -3 }}
              name="play"
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
