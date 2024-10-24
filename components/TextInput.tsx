import {
  StyleSheet,
  TextInput as RNTextInput,
  View,
  TextInputProps,
  Text,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { useMemo } from "react";

interface AppTextInputProps extends TextInputProps {
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
}

const TextInput = ({
  value,
  onChangeText,
  containerStyle,
  placeholder,
  style,
  label,
  ...rest
}: AppTextInputProps) => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View style={containerStyle}>
      {Boolean(label) && <Text style={styles.label}>{label}</Text>}
      <RNTextInput
        {...rest}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]}
      />
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    label: {
      fontSize: 16,
      color: "gray",
      fontWeight: "700",
      fontFamily: "Markazi",
    },
    input: {
      borderWidth: 1,
      borderColor: "lightgray",
      borderRadius: 8,
      padding: 8,
    },
  });

export default TextInput;
