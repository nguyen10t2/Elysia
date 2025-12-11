import { Cookie, Elysia } from "elysia";
import { userRoutes } from "./routes/userRoutes";
import { pluginDB } from "./database/pluginDB";
import { authRoutes } from "./routes/authRoutes";

const hostname: string = Bun.env.IP_ADDRESS || '127.0.0.1';
const port: number = Number(Bun.env.PORT ||'3000');

new Elysia()
  .use(pluginDB)
  .get('/', () => 'Elysia Server is running!')
  .use(authRoutes)
  .use(userRoutes)
  .listen({hostname, port});

console.log(
  'Server run at: ' + hostname + ":" + port
);