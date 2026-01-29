import { eq } from "drizzle-orm";
import { db } from "../index.js";
import { usersTable } from "../schema/users.schema.js";

export async function findUserByEmail(email) {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
  return result[0] || null;
}

export async function createUser({ name, email, hashedPassword }) {
  const result = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
      role: usersTable.role,
      authProvider: usersTable.authProvider,
    });

  return result[0];
}
