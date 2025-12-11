import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../models/__index';

// connect to your database

const sql = postgres(Bun.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });