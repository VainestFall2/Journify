import fastifyMultipart from '@fastify/multipart';
import fastify from 'fastify';
import { routes } from './routes';
import cors from '@fastify/cors'

const app = fastify({ logger: true });

app.register(fastifyMultipart);
app.register(routes);
app.register(cors)

export default app;
