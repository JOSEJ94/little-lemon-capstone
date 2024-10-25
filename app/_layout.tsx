import Avatar from "@/components/Avatar";
import Header from "@/components/navigation/Header";
import { AppColors } from "@/constants/Colors";
import {
  FIRST_NAME_STORAGE_KEY,
  LAST_NAME_STORAGE_KEY,
  PROFILE_IMG_STORAGE_KEY,
} from "@/constants/Keys";
import { useStorageValue } from "@/hooks/useStorageValue";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { useMemo } from "react";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  const router = useRouter();
  const styles = useMemo(() => createStyles(), []);

  const [firstName] = useStorageValue(FIRST_NAME_STORAGE_KEY);
  const [lastName] = useStorageValue(LAST_NAME_STORAGE_KEY);
  const [profilePhoto] = useStorageValue(PROFILE_IMG_STORAGE_KEY);
  useFonts({
    Karla: require("../assets/fonts/Karla-Regular.ttf"),
    Markazi: require("../assets/fonts/MarkaziText-Regular.ttf"),
  });

  const avatarName =
    `${firstName?.substring(0, 1) ?? ""}${lastName?.substring(0, 1) ?? ""}` ||
    "You";
  return (
    <Stack
      initialRouteName="Onboarding"
      screenOptions={{
        headerTintColor: AppColors.primary1,
        headerTitle: () => <Header />,
      }}
    >
      <Stack.Screen name="Onboarding" />
      <Stack.Screen
        name="Home"
        options={{
          headerRight: () => (
            <Avatar
              name={avatarName}
              imageUri={profilePhoto}
              size={30}
              onPress={() => router.navigate("/Profile")}
              containerStyle={styles.avatarContainer}
            />
          ),
        }}
      />
      <Stack.Screen name="Profile" />
    </Stack>
  );
}

export const createStyles = () =>
  StyleSheet.create({
    avatarContainer: {
      alignSelf: "flex-end",
      marginRight: 12,
    },
  });
