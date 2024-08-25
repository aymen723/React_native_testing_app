import { Stack } from "expo-router";
import React from "react";

export default function layout() {
  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerShown: false,
        }}
        name="imageViewer"
      />
    </Stack>
  );
}
