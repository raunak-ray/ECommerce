import { sql } from "drizzle-orm";
import {
  check,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnums = pgEnum("user_role", [
  "customer",
  "seller",
  "admin",
]);

export const userAuthProviders = pgEnum("user_auth_provider", [
  "email",
  "google",
  "github",
]);

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: userRoleEnums("role").notNull().default("customer"),
  authProvider: userAuthProviders("authProvider").notNull().default("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
