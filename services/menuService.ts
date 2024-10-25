import { MenuItem } from "./localDBService";

export const getMenuFromServer = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
    );
    const json = await response.json();
    return json.menu as MenuItem[];
  } catch (error) {
    console.error(error);
  }
};
