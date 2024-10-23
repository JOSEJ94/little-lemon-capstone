import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";

const Profile = () => {
  const styles = useMemo(() => createStyles(), []);
  return (
    <View>
      <Text>Profile</Text>
    </View>
  );
};

export default Profile;

const createStyles = () => StyleSheet.create({});
