import { eq } from "drizzle-orm";
import { db } from "../database/db";
import { Users } from "../models/user";

export const getUserById = async (id: string) => {
  try {
    const rows = await db.select()
      .from(Users)
      .where(eq(Users.id, id));
    
    if (rows.length === 0) {
      return { error: 'Not Found', status: 404 };
    }

    const { password, ...userWithoutPassword } = rows[0];

    return { data: userWithoutPassword };
  } catch (error) {
    return { error: error, status: 500 };
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const rows = await db.select()
      .from(Users)
      .where(eq(Users.email, email));

    if (rows.length === 0) {
      return { error: 'Not Found', status: 404 };
    }

    const { password, ...userWithoutPassword } = rows[0];

    return { data: userWithoutPassword };
  } catch (error) {
    return { error: error, status: 500 };
  }
};