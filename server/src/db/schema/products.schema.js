import {
  integer,
  numeric,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { categoryTable } from "./categories.schema.js";
import { usersTable } from "./users.schema.js";

export const productTable = pgTable("products", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  price: numeric({ precision: 6, scale: 2 }).notNull(),
  stock: integer().notNull().default(0),
  categoryId: uuid("category_id")
    .notNull()
    .references(() => categoryTable.id, { onDelete: "restrict" }),
  sellerId: uuid("seller_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
