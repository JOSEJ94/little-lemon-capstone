import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseAsync("little_lemon");

export interface MenuItem {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const saveMenuItems = async (items: MenuItem[]) => {
  try {
    const itemsInsertQueries = items
      .map(
        (item) =>
          `INSERT INTO menuitems (name, price, description, image, category) VALUES ("${item.name}",${item.price},"${item.description}","${item.image}","${item.category}");`
      )
      .join(" ");

    await (
      await db
    ).execAsync(`
          CREATE TABLE IF NOT EXISTS menuitems (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, price INTEGER, description TEXT NOT NULL, image TEXT NOT NULL, category TEXT NOT NULL);
          ${itemsInsertQueries}
          `);
  } catch (error) {
    console.error(error);
  }
};

export const getMenuItems = async () => {
  try {
    return await (await db).getAllAsync<MenuItem>(`SELECT * FROM menuitems;`);
  } catch (error) {
    console.error(error);
  }
};

export const searchMenuItems = async (
  searchTerm: string,
  categories: string[]
) => {
  try {
    const query = `SELECT * FROM menuitems WHERE name LIKE '%${searchTerm}%' ${
      categories?.length
        ? `AND category IN (${categories
            .map((cat) => `"${cat.toLowerCase()}"`)
            .join(", ")})`
        : ""
    };`;
    return await (await db).getAllAsync<MenuItem>(query);
  } catch (error) {
    console.error(error);
  }
};
