import { db } from "../index.js";
import { categoryTable } from "../schema/categories.schema.js";
import { productTable } from "../schema/products.schema.js";
import { usersTable } from "../schema/users.schema.js";

import { and, eq, gte, lte, ilike, sql } from "drizzle-orm";

export const getAllProduct = async ({ limit, offset, filters }) => {
  const whereConditions = [];

  if (filters.categoryId) {
    whereConditions.push(eq(productTable.categoryId, filters.categoryId));
  }

  if (filters.minPrice) {
    whereConditions.push(gte(productTable.price, filters.minPrice));
  }

  if (filters.maxPrice) {
    whereConditions.push(lte(productTable.price, filters.maxPrice));
  }

  if (filters.search) {
    whereConditions.push(ilike(productTable.name, `%${filters.search}%`));
  }

  const whereClause =
    whereConditions.length > 0 ? and(...whereConditions) : undefined;

  // DATA QUERY
  const data = await db
    .select({
      id: productTable.id,
      name: productTable.name,
      price: productTable.price,
      stock: productTable.stock,
      coverImage: productTable.coverImage,
    })
    .from(productTable)
    .where(whereClause)
    .limit(limit)
    .offset(offset);

  // COUNT QUERY
  const [{ count }] = await db
    .select({ count: sql`count(*)` })
    .from(productTable)
    .where(whereClause);

  return {
    data,
    total: Number(count),
  };
};

export const createProduct = async (
  name,
  description,
  price,
  stock,
  categoryId,
  userId,
  coverImage,
) => {
  const result = await db
    .insert(productTable)
    .values({
      name,
      description,
      price,
      stock,
      categoryId,
      sellerId: userId,
      coverImage,
    })
    .returning();

  return result[0];
};

// export const getAllProduct = async () => {
//   const result = await db
//     .select({
//       id: productTable.id,
//       name: productTable.name,
//       description: productTable.description,
//       price: productTable.price,
//       stock: productTable.stock,
//       coverImage: productTable.coverImage,
//       category: {
//         id: categoryTable.id,
//         name: categoryTable.name,
//       },
//       seller: {
//         id: usersTable.id,
//         name: usersTable.name,
//       },
//     })
//     .from(productTable)
//     .innerJoin(categoryTable, eq(productTable.categoryId, categoryTable.id))
//     .innerJoin(usersTable, eq(productTable.sellerId, usersTable.id));

//   return result;
// };

export const getProduct = async (productId) => {
  const result = await db
    .select({
      id: productTable.id,
      name: productTable.name,
      description: productTable.description,
      price: productTable.price,
      stock: productTable.stock,
      coverImage: productTable.coverImage,
      category: {
        id: categoryTable.id,
        name: categoryTable.name,
      },
      seller: {
        id: usersTable.id,
        name: usersTable.name,
      },
    })
    .from(productTable)
    .innerJoin(categoryTable, eq(productTable.categoryId, categoryTable.id))
    .innerJoin(usersTable, eq(productTable.sellerId, usersTable.id))
    .where(eq(productTable.id, productId));

  return result[0];
};

export const getAllProductByCategory = async (id) => {
  const result = await db
    .select({
      category: categoryTable.name,
      id: productTable.id,
      name: productTable.name,
      description: productTable.description,
      price: productTable.price,
      stock: productTable.stock,
      coverImage: productTable.coverImage,
      seller: {
        id: usersTable.id,
        name: usersTable.name,
      },
    })
    .from(productTable)
    .innerJoin(categoryTable, eq(productTable.categoryId, categoryTable.id))
    .innerJoin(usersTable, eq(productTable.sellerId, usersTable.id))
    .where(eq(categoryTable.id, id));

  return result;
};

export const updateProduct = async (
  sellerId,
  productId,
  { name, description, price, stock, categoryId, coverImage },
) => {
  const updateData = {};

  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (price !== undefined) updateData.price = price;
  if (stock !== undefined) updateData.stock = stock;
  if (categoryId !== undefined) updateData.categoryId = categoryId;
  if (coverImage !== undefined) updateData.coverImage = coverImage;

  // Prevent empty updates
  if (Object.keys(updateData).length === 0) {
    return null;
  }

  const result = await db
    .update(productTable)
    .set(updateData)
    .where(
      and(eq(productTable.id, productId), eq(productTable.sellerId, sellerId)),
    )
    .returning();

  return result[0];
};

export const deleteProduct = async (sellerId, productId) => {
  const result = await db
    .delete(productTable)
    .where(
      role === "admin"
        ? eq(productTable.id, productId)
        : and(
            eq(productTable.id, productId),
            eq(productTable.sellerId, sellerId),
          ),
    )
    .returning();

  return result[0];
};
