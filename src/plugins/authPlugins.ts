import Elysia, { Context } from "elysia";
import * as jose from "jose";
import { ContextStore } from "../types/context";


export const authPlugins = (app: Elysia) => app
  .onBeforeHandle(async (ctx) => {

    const authHeader = ctx.request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      ctx.set.status = 401;
      return { error: 'Unauthorized' };
    }
    
    const token = authHeader.split(' ')[1];
    
    try {
      const { payload } = await jose.jwtVerify(
        token,
        new TextEncoder().encode(Bun.env.JWT_SECRET)
      );

      (ctx.store as ContextStore).user = payload;

    } catch (error) {
      ctx.set.status = 401;
      return { error: 'Invalid token' };
    }
  });