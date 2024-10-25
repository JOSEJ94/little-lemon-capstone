import { View, Text, StyleSheet, Image } from "react-native";
import React, { useMemo } from "react";

const LOGO_SIZE = 40;

const Header = (props: any) => {
  const styles = useMemo(() => createStyles(), []);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("@/assets/images/logo.png")} />
      <Text style={styles.name}>Little Lemon</Text>
    </View>
  );
};

const createStyles = () =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      flexDirection: "row",
    },
    logo: {
      height: LOGO_SIZE,
      width: LOGO_SIZE,
    },
    name: {
      fontSize: 18,
      color: "green",
      fontFamily: "Karla",
      textTransform: "uppercase",
    },
  });

export default Header;
