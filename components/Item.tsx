import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { MenuItem } from "@/services/localDBService";
import { AppColors } from "@/constants/Colors";
import { useRouter } from "expo-router";

interface ItemProps {
  menuItem: MenuItem;
}

const Item = ({ menuItem }: ItemProps) => {
  const router = useRouter();
  const styles = useMemo(() => createStyles(), []);

  const onMenuItemPress = () => {
    router.navigate("/Profile");
  };

  return (
    <Pressable style={styles.container} onPress={onMenuItemPress}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{menuItem.name}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {menuItem.description}
        </Text>
        <Text style={styles.price}>${menuItem.price}</Text>
      </View>
      <Image
        source={{
          uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${menuItem.image}?raw=true`,
        }}
        style={styles.img}
      />
    </Pressable>
  );
};

export default Item;

const createStyles = () =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "row",
      marginHorizontal: 12,
      paddingVertical: 12,
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
    },
    infoContainer: {
      flex: 1,
      paddingRight: 12,
    },
    title: {
      fontWeight: "bold",
      marginBottom: 8,
    },
    img: {
      aspectRatio: 1,
      height: 100,
    },
    description: {
      color: AppColors.highlight2,
    },
    price: {
      marginTop: 12,
      fontWeight: "600",
      color: AppColors.primary1,
    },
  });
