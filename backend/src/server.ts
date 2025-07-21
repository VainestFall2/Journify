import fastify from 'fastify';
import { routes } from './routes';

const app = fastify({ logger: true });

const start = async () => {
  app.register(routes);

  app.listen({ port: 8000 }, () => {
    console.log('O servidor está rodando...');
  });
};

start();
