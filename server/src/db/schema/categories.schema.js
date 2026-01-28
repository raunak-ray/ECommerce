import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const categoryTable = pgTable("categories", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
});
