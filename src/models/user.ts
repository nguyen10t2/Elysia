import { pgTable, varchar, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { Role } from "./roles";

export const Users = pgTable('users', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    password: text('password').notNull(),
    role: Role('role'),
    created_at: timestamp('created_at', { withTimezone: true })
        .notNull()
        .default(sql`now()`),

    updated_at: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .default(sql`now()`)
        .$onUpdate(() => new Date()),
});