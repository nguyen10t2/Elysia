import { sql } from "drizzle-orm";
import { AnyPgColumn, PgColumnBuilder, PgColumnBuilderBase, timestamp } from "drizzle-orm/pg-core";


export const timestamps = {
    created_at: timestamp('created_at', { withTimezone: true })
        .notNull()
        .default(sql`now()`),

    updated_at: timestamp('updated_at', { withTimezone: true })
        .notNull()
        .default(sql`now()`)
        .$onUpdate(() => new Date()),
};

export function withTimestamps<T extends Record<string, PgColumnBuilderBase<any>>>(column: T) {
    return {
        ...column,
        ...timestamps,
    };
};