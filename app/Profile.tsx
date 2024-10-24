import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import TextInput from "@/components/TextInput";

const Profile = () => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <ScrollView style={styles.scrollviewContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Personal Information</Text>
        <TextInput
          label="First name"
          placeholder="First Name"
          containerStyle={styles.input}
        />
        <TextInput
          label="Last name"
          placeholder="Last Name"
          containerStyle={styles.input}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          containerStyle={styles.input}
        />
        <TextInput
          label="Phone number"
          placeholder="Phone number"
          containerStyle={styles.input}
        />
        <Text style={styles.secondTitle}>Email notifications</Text>
      </View>
    </ScrollView>
  );
};

export default Profile;

const createStyles = () =>
  StyleSheet.create({
    scrollviewContainer: {
      backgroundColor: "white",
    },
    container: {
      margin: 12,
      padding: 12,
      borderWidth: 1,
      borderRadius: 8,
      borderColor: "lightgray",
      backgroundColor: "white",
    },
    title: {
      fontFamily: "Monospace",
      fontWeight: "600",
      fontSize: 18,
    },
    input: {
      marginVertical: 12,
    },
    secondTitle: {
      marginTop: 10,
      fontFamily: "Monospace",
      fontWeight: "600",
      fontSize: 18,
    },
  });
