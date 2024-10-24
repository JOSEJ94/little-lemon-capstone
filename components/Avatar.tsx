import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import { AppColors } from "@/constants/Colors";

interface AvatarProps {
  name: string;
  imageUri?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const Avatar = ({ name, imageUri, containerStyle }: AvatarProps) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={[styles.container, containerStyle]}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.avatarImage} />
      ) : (
        <Text style={styles.avatarLabel}>{name}</Text>
      )}
    </View>
  );
};

export default Avatar;

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: "flex-start",
      justifyContent: "center",
      alignItems: "center",
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: AppColors.secondary1,
    },
    avatarImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
    },
    avatarLabel: {
      fontSize: 36,
      fontFamily: "Karla",
      color: "white",
    },
  });
