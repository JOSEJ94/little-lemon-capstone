import {
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
  StyleProp,
  TextStyle,
  ActivityIndicator,
} from "react-native";
import React, { useMemo } from "react";
import { AppColors } from "@/constants/Colors";

interface ButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({
  title,
  disabled,
  style,
  textStyle,
  loading,
  ...rest
}: ButtonProps) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <Pressable
      style={[styles.container, disabled && styles.disabledContainer, style]}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size={5} color={AppColors.secondary1} />
      ) : (
        <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: "flex-start",
      borderRadius: 6,
      padding: 6,
      alignItems: "center",
      backgroundColor: AppColors.primary1,
      minWidth: 120,
    },
    disabledContainer: {
      backgroundColor: "gray",
    },
    text: {
      fontFamily: "Karla",
      color: AppColors.highlight1,
      fontWeight: "bold",
    },
    disabledText: {
      color: "lightgray",
    },
  });

export default Button;
