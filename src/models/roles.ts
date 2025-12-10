import { pgEnum } from "drizzle-orm/pg-core";

export const Role = pgEnum('user_role', ['resident', 'manager', 'accountant']);

export type RoleType = 'resident' | 'manager' | 'accountant';