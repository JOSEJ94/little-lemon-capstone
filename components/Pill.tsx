import { Pressable, PressableProps, StyleSheet, Text } from "react-native";
import React, { useMemo } from "react";
import { AppColors } from "@/constants/Colors";

interface PillProps extends PressableProps {
  name: string;
  selected?: boolean;
}

const Pill = ({ name, style, selected, ...rest }: PillProps) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <Pressable
      style={[styles.container, selected && styles.buttonSelected, style]}
      {...rest}
    >
      <Text style={[styles.label, selected && styles.textSelected]}>
        {name}
      </Text>
    </Pressable>
  );
};

export default Pill;

const createStyles = () =>
  StyleSheet.create({
    container: {
      backgroundColor: "lightgray",
      padding: 8,
      borderRadius: 12,
    },
    buttonSelected: {
      backgroundColor: AppColors.primary1,
    },
    textSelected: {
      color: AppColors.primary2,
    },
    label: {
      color: AppColors.primary1,
      fontWeight: "bold",
      fontSize: 18,
    },
  });
