import { useEffect, useState } from "react";
import {
  getMenuItems,
  MenuItem,
  saveMenuItems,
  searchMenuItems,
} from "@/services/localDBService";
import { getMenuFromServer } from "@/services/menuService";

export const useMenuItems = (
  searchTerm: string,
  selectedCategories: string[]
) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getInfo = async () => {
    const storedMenuItems = await getMenuItems();
    if (!storedMenuItems?.length) {
      const newMenuItems = (await getMenuFromServer()) || [];
      setMenuItems(newMenuItems);
      await saveMenuItems(newMenuItems);
    } else {
      setMenuItems(storedMenuItems);
    }
    setLoading(false);
  };

  const search = async () => {
    const newMenuItems = await searchMenuItems(searchTerm, selectedCategories);
    setMenuItems(newMenuItems || []);
  };

  useEffect(() => {
    search();
  }, [searchTerm, selectedCategories.length]);

  useEffect(() => {
    getInfo();
  }, []);

  return { menuItems, loading };
};
