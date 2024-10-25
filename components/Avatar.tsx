import {
  Image,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import { AppColors } from "@/constants/Colors";

interface AvatarProps extends PressableProps {
  name: string;
  imageUri?: string;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

const Avatar = ({
  name,
  imageUri,
  size,
  containerStyle,
  ...rest
}: AvatarProps) => {
  const styles = useMemo(() => createStyles(size), [size]);
  return (
    <Pressable style={[styles.container, containerStyle]} {...rest}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.avatarImage} />
      ) : (
        <Text style={styles.avatarLabel}>{name}</Text>
      )}
    </Pressable>
  );
};

export default Avatar;

const createStyles = (size = 60) =>
  StyleSheet.create({
    container: {
      alignSelf: "flex-start",
      justifyContent: "center",
      alignItems: "center",
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: AppColors.secondary1,
    },
    avatarImage: {
      width: size,
      height: size,
      borderRadius: size / 2,
    },
    avatarLabel: {
      fontSize: size / 2,
      fontFamily: "Karla",
      color: "white",
    },
  });
