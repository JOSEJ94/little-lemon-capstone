import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useMemo, useState } from "react";
import { AppColors } from "@/constants/Colors";
import Pill from "@/components/Pill";
import { useMenuItems } from "@/hooks/useMenuItems";
import { MenuItem } from "@/services/localDBService";
import Item from "@/components/Item";
import TextInput from "@/components/TextInput";

const Home = () => {
  const styles = useMemo(() => createStyles(), []);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setsearchTerm] = useState("");
  const { menuItems, loading } = useMenuItems(searchTerm, selectedCategory);

  const header = (
    <View style={styles.headerContainer}>
      <Text style={styles.restaurantName}>Little Lemon</Text>
      <View style={styles.restaurantContainer}>
        <View style={styles.restaurantInfoContainer}>
          <Text style={styles.locationName}>Chicago</Text>
          <Text style={styles.description}>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </Text>
        </View>
        <Image
          source={require("@/assets/images/Hero image.png")}
          style={styles.heroImg}
        />
      </View>
      <TextInput
        containerStyle={styles.searchBarContainer}
        style={styles.searchBar}
        value={searchTerm}
        placeholder="Search"
        onChangeText={setsearchTerm}
      />
    </View>
  );

  const categories = () => {
    const renderCategoryItem = (info: ListRenderItemInfo<string>) => {
      const isSelected = selectedCategory === info.item;

      const selectCategory = () => {
        setSelectedCategory(info.item);
      };
      return (
        <Pill name={info.item} selected={isSelected} onPress={selectCategory} />
      );
    };

    return (
      <>
        <Text style={styles.categoriesTitle}>Order for delivery!</Text>
        <FlatList
          horizontal
          data={["Starters", "Mains", "Desserts", "Drinks"]}
          showsHorizontalScrollIndicator={false}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.categoriesContentContainer}
          style={styles.categorySeparator}
        />
      </>
    );
  };

  const finalHeader = (
    <>
      {header}
      {categories()}
    </>
  );

  const renderMenuItem = (info: ListRenderItemInfo<MenuItem>) => {
    return <Item menuItem={info.item} />;
  };

  return (
    <FlatList
      ListHeaderComponent={finalHeader}
      renderItem={renderMenuItem}
      data={menuItems}
    />
  );
};

export default Home;

const createStyles = () =>
  StyleSheet.create({
    container: {},
    headerContainer: {
      padding: 16,
      backgroundColor: AppColors.primary1,
    },
    restaurantContainer: {
      flexDirection: "row",
      flex: 1,
    },
    restaurantInfoContainer: {
      flex: 0.6,
    },
    categorySeparator: {
      borderBottomColor: "lightgray",
      borderBottomWidth: 1,
    },
    categoriesContentContainer: {
      paddingHorizontal: 12,
      paddingBottom: 12,
      gap: 18,
    },
    restaurantName: {
      fontSize: 62,
      fontFamily: "Markazi",
      color: AppColors.primary2,
    },
    locationName: {
      top: -10,
      color: "white",
      fontFamily: "Markazi",
      fontSize: 32,
    },
    description: {
      fontSize: 18,
      marginRight: 16,
      color: "white",
      fontFamily: "Karla",
    },
    heroImg: {
      flex: 0.4,
      height: 150,
      borderRadius: 12,
    },
    categoriesTitle: {
      textTransform: "uppercase",
      fontWeight: "bold",
      color: "black",
      fontSize: 18,
      marginHorizontal: 12,
      marginTop: 24,
      marginBottom: 12,
    },
    searchBarContainer: {
      marginTop: 12,
    },
    searchBar: {
      backgroundColor: "white",
    },
  });
