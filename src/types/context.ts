import { Cookie } from "elysia";

export type ContextStore = {
    user?: Record<string, any>;
};

export type ContextCookie = {
    refreshToken: Cookie<unknown>;
}