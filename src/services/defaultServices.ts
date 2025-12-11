import { db } from "../database/db";
import { Role, Status } from "../models/user";

export const insertDefaultRoles = async () => {
    const existingRoles = await db.select().from(Role);
    if (existingRoles.length === 0) {
        await db.insert(Role).values([
            { name: 'resident' },
            { name: 'accountant' },
            { name: 'manager' },
            { name: 'admin' }
        ]);
    }
};

export const insertDefaultStatuses = async () => {
    const existingStatuses = await db.select().from(Status);
    if (existingStatuses.length === 0) {
        await db.insert(Status).values([
            { name: 'active' },
            { name: 'inactive' },
            { name: 'pending' }
        ]);
    }
};

export const initializeDefaultServices = async () => {
    await insertDefaultRoles();
    await insertDefaultStatuses();
};