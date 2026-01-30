import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { categoryTable } from "../schema/categories.schema.js";

export const findCategoryByName = async (name) => {
  const result = await db
    .select()
    .from(categoryTable)
    .where(eq(categoryTable.name, name));

  return result[0] || null;
};

export const createCategory = async (name) => {
  const result = await db.insert(categoryTable).values({ name }).returning();
  return result[0];
};

export const updateCategory = async (id, newName) => {
  const result = await db
    .update(categoryTable)
    .set({ name: newName })
    .where(eq(categoryTable.id, id))
    .returning();

  return result[0] || null;
};

export const getAllCategory = async () => {
  const result = await db.select().from(categoryTable);

  return result;
};

export const deleteCategoryById = async (id) => {
  const result = await db
    .delete(categoryTable)
    .where(eq(categoryTable.id, id))
    .returning();

  return result[0] || null;
};
