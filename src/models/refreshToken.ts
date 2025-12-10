import { pgTable, varchar, uuid, timestamp, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const RefreshTokens = pgTable('refresh_tokens', {
    id: uuid('id').primaryKey().default(sql`gen_random_uuid()`),
    user_id: uuid('user_id').notNull(),
    token: text('token').notNull(),
    expires_at: timestamp('expires_at', { withTimezone: true })
        .notNull(),
    created_at: timestamp('created_at', { withTimezone: true })
        .notNull()
        .default(sql`now()`),

    updated_at: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .default(sql`now()`)
        .$onUpdate(() => new Date()),
});