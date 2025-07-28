import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserController } from './Controller/Auth/CreateUserController';
import { GetUserController } from './Controller/Auth/GetUserController';
import { LoginUserController } from './Controller/Auth/LoginUserController';
import { AddMomentsController } from './Controller/Moments/AddMomentsController';
import { authenticateToken } from './middleware/authenticateToken';

export function routes(fastify: FastifyInstance) {
  // AUTH: CRIAÇÃO DE USUÁRIO
  fastify.post(
    '/create-account',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(request, reply);
    },
  );

  // AUTH: LOGIN DE USUÁRIO
  fastify.post(
    '/login',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new LoginUserController().handle(request, reply);
    },
  );

  // AUTH: BUSCA DE USUÁRIO
  fastify.get(
    '/get-user',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new GetUserController().handle(request, reply);
    },
  );

  // AUTH: ADICIONAR UM NOVO MOMENTO
  fastify.post(
    '/add-registered-moment',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new AddMomentsController().handle(request, reply);
    },
  );
}
