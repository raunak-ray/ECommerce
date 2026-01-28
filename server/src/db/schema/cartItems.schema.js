import { integer, pgTable, timestamp, unique, uuid } from "drizzle-orm/pg-core";
import { cartTable } from "./carts.schema.js";
import { productTable } from "./products.schema.js";

export const cartItemsTable = pgTable(
  "cart_items",
  {
    id: uuid().defaultRandom().primaryKey(),
    cartId: uuid("cart_id")
      .notNull()
      .references(() => cartTable.id, { onDelete: "cascade" }),
    productId: uuid("product_id")
      .notNull()
      .references(() => productTable.id, { onDelete: "restrict" }),
    quantity: integer().notNull().default(1),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    uniqueProductPerCart: unique().on(table.cartId, table.productId),
  }),
);
