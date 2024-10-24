import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { isEmailValid as validateEmail } from "@/utils/validator";
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBOARDING_COMPLETED_STORAGE_KEY } from "@/constants/Keys";
import TextInput from "@/components/TextInput";

const Onboarding = () => {
  const styles = useMemo(() => createStyles(), []);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const isFirstNameValid = firstName.length > 0;
  const isEmailValid = validateEmail(email);
  const isFormValid = isEmailValid && isFirstNameValid;

  const goToNextScreen = async () => {
    await AsyncStorage.setItem(ONBOARDING_COMPLETED_STORAGE_KEY, "true");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Let us get to know you</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        containerStyle={styles.input}
      />
      <TextInput
        keyboardType="email-address"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.input}
      />
      <Button
        style={styles.button}
        disabled={!isFormValid}
        title="Next"
        onPress={goToNextScreen}
      />
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    greetingText: {
      marginHorizontal: 24,
      marginVertical: 48,
      alignSelf: "center",
      fontSize: 24,
      fontFamily: "Karla",
    },
    input: {
      marginHorizontal: 24,
    },
    button: {
      alignSelf: "center",
      marginTop: 30,
    },
  });

export default Onboarding;
