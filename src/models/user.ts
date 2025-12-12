import { pgTable, varchar, uuid, timestamp, text, serial } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const Role = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull()
});

export const Status = pgTable('statuses', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull()
});

export const Users = pgTable('users', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull().unique(),
    password: text('password').notNull(),
    role: serial('role').default(0).notNull(),
    // status: serial('status').notNull().default(0),
    // rejectedReaseon: text('rejected_reason'),
    // residentId: uuid('resident_id'),
    // approvedBy: uuid('approved_by'),
    // approvedAt: timestamp('approved_at', { withTimezone: true }),

    created_at: timestamp('created_at', { withTimezone: true })
        .notNull()
        .default(sql`now()`),

    updated_at: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .default(sql`now()`)
        .$onUpdate(() => new Date()),
});