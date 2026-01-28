import { pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { usersTable } from "./users.schema.js";

export const cartTable = pgTable("carts", {
  id: uuid().defaultRandom().primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .unique()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
