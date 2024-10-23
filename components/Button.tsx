import { Text, StyleSheet, Pressable, PressableProps } from "react-native";
import React, { useMemo } from "react";

interface ButtonProps extends PressableProps {
  title: string;
}

const Button = ({ title, disabled, style, ...rest }: ButtonProps) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <Pressable
      style={[styles.container, disabled && styles.disabledContainer, style]}
      disabled={disabled}
      {...rest}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        {title}
      </Text>
    </Pressable>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignSelf: "flex-start",
      borderRadius: 12,
      padding: 6,
      alignItems: "center",
      backgroundColor: "red",
      minWidth: 120,
    },
    disabledContainer: {
      backgroundColor: "gray",
    },
    text: {
      color: "#FFF",
      fontWeight: "700",
    },
    disabledText: {
      color: "lightgray",
    },
  });

export default Button;
