import { View, Text, StyleSheet } from "react-native";
import React, { useMemo, useState } from "react";
import { isEmailValid as validateEmail } from "@/utils/validator";
import Button from "@/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  EMAIL_STORAGE_KEY,
  FIRST_NAME_STORAGE_KEY,
  ONBOARDING_COMPLETED_STORAGE_KEY,
} from "@/constants/Keys";
import TextInput from "@/components/TextInput";
import { useRouter } from "expo-router";

const Onboarding = () => {
  const router = useRouter();
  const styles = useMemo(() => createStyles(), []);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const isFirstNameValid = firstName.length > 0;
  const isEmailValid = validateEmail(email);
  const isFormValid = isEmailValid && isFirstNameValid;

  const goToNextScreen = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETED_STORAGE_KEY, "true");
      await AsyncStorage.setItem(FIRST_NAME_STORAGE_KEY, firstName);
      await AsyncStorage.setItem(EMAIL_STORAGE_KEY, email);
      router.navigate("/Home");
    } catch (error) {
      console.error("There was an error while trying to save the information");
    }
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
      marginVertical: 12,
    },
    button: {
      alignSelf: "center",
      marginTop: 30,
    },
  });

export default Onboarding;
