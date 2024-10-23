import Header from "@/components/navigation/Header";
import { ONBOARDING_COMPLETED_STORAGE_KEY } from "@/constants/Keys";
import { useStorageValue } from "@/hooks/useStorageValue";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  useFonts({
    Karla: require("../assets/fonts/Karla-Regular.ttf"),
    Markazi: require("../assets/fonts/MarkaziText-Regular.ttf"),
  });

  return (
    <Stack
      initialRouteName="Onboarding"
      screenOptions={{ header: (props) => <Header {...props} /> }}
    >
      <Stack.Screen name="Onboarding" />
      <Stack.Screen name="Profile" />
    </Stack>
  );
}
