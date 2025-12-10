import { Elysia } from "elysia"
import { loginHandler } from "../handlers/authHandlers";

export const authRoutes = new Elysia({ prefix: "/auth" })
    .post("/login", loginHandler);