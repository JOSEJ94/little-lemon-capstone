import { useEffect, useState } from "react";
import {
  getMenuItems,
  MenuItem,
  saveMenuItems,
} from "@/services/localDBService";
import { getMenuFromServer } from "@/services/menuService";

export const useMenuItems = (searchTerm: string, selectedCategory: string) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    const storedMenuItems = await getMenuItems();
    console.log("storedMenuItems", storedMenuItems);

    if (!storedMenuItems?.length) {
      const newMenuItems = (await getMenuFromServer()) || [];
      setMenuItems(newMenuItems);
      await saveMenuItems(newMenuItems);
    } else {
      setMenuItems(storedMenuItems);
    }
    setLoading(false);
  };

  useEffect(() => {
    getInfo();
  }, []);

  return { menuItems, loading };
};
