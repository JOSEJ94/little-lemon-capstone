import { View, Text, StyleSheet, Image } from "react-native";
import React, { useMemo } from "react";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";
import {} from "expo-router";

const LOGO_SIZE = 40;

const Header = (props: any) => {
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => createStyles(insets), [insets]);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/images/logo.png")} />
      <Text style={styles.name}>Little Lemon</Text>
    </View>
  );
};

const createStyles = (insets: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      paddingTop: insets.top,
      justifyContent: "center",
      alignItems: "center",
    },
    logo: {
      height: LOGO_SIZE,
      width: LOGO_SIZE,
    },
    name: {
      fontSize: 24,
      fontFamily: "Karla",
    },
  });

export default Header;
