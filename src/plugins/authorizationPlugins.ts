import Elysia from "elysia";
import { ContextStore } from "../types/context";


export const authorizationPlugins = (role: number = 1) => (app: Elysia) => app
    .onBeforeHandle(async (ctx) => {
        const user = (ctx.store as ContextStore).user || undefined;
        if (!user) {
            ctx.set.status = 401;
            return { error: 'Unauthorized' };
        }

        if (user.role < role) {
            ctx.set.status = 403;
            return { error: 'Forbidden' };
        }
    });