import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome";
import { AppColors } from "@/constants/Colors";

interface CheckboxProps {
  label: string;
  containerStyle?: StyleProp<ViewStyle>;
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

const Checkbox = ({
  containerStyle,
  value,
  onValueChange,
  label,
}: CheckboxProps) => {
  const styles = useMemo(() => createStyles(), []);

  const localOnValueChange = () => {
    if (onValueChange) {
      onValueChange(!value);
    } else {
      console.error(
        `Checkbox with label ${label} :You need to pass an updater function to this component`
      );
    }
  };

  return (
    <Pressable
      style={[styles.container, containerStyle]}
      onPress={localOnValueChange}
    >
      {value ? (
        <FontAwesomeIcon
          name="check-square"
          size={styles.icon.width}
          color={AppColors.primary1}
          style={[styles.icon, styles.checkedAdjust]}
        />
      ) : (
        <FontAwesomeIcon
          name="square-o"
          size={styles.icon.width}
          color={AppColors.primary1}
          style={styles.icon}
        />
      )}
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

export default Checkbox;

const createStyles = () =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },
    label: {
      marginHorizontal: 8,
      fontFamily: "Karla",
      fontSize: 14,
    },
    checkedAdjust: {
      top: -1,
    },
    icon: {
      width: 24,
    },
  });
