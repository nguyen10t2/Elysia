import { Elysia } from "elysia";
import {
  getUserById, getUserByEmail
} from "../services/userServices";
import { authenticationPlugins } from "../plugins/authenticationPlugins";
import { ContextStore } from "../types/context";
import { REFRESHTOKEN_TTL } from "../constants/time";
import { authorizationPlugins } from "../plugins/authorizationPlugins";


export const userRoutes = new Elysia({
  prefix: '/users',
  cookie: {
    secure: true,
    httpOnly: true,
    maxAge: REFRESHTOKEN_TTL,
    sign: 'refreshtoken',
  }})
  .use(authenticationPlugins)
  .use(authorizationPlugins())
  .get('/:id', async ({ params: { id } }) => await getUserById(id))
  .get('/email/:email', async ({ params: { email } }) => await getUserByEmail(email))
  .get('/me', ({ store }) => {
    const user = (store as ContextStore).user || {};
    return user;
  })