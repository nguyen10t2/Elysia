import { Elysia } from "elysia";
import {
  getUserById, getUserByEmail
} from "../services/userServices";
import * as jose from "jose";


export const userRoutes = new Elysia({ prefix: '/users' })
  .derive(async (ctx) => {
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
      return { user: payload };
    } catch (error) {
      ctx.set.status = 401;
      return { error: 'Invalid token' };
    }
  })
  .get('/:id', async ({ params: { id } }) => await getUserById(id))
  .get('/email/:email', async ({ params: { email } }) => await getUserByEmail(email))
  .get('/me', ({ user }) => {
    return user;
  })