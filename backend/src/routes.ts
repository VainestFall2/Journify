import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserController } from './Controller/CreateUserController';
import { GetUserController } from './Controller/GetUserController';
import { LoginUserController } from './Controller/LoginUserController';
import { authenticateToken } from './middleware/authenticateToken';

export function routes(fastify: FastifyInstance) {
  // CRIAÇÃO DE USUÁRIO
  fastify.post(
    '/create-account',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new CreateUserController().handle(request, reply);
    },
  );

  // LOGIN DE USUÁRIO
  fastify.post(
    '/login',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new LoginUserController().handle(request, reply);
    },
  );

  // BUSCA DE USUÁRIO
  fastify.get(
    '/get-user',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new GetUserController().handle(request, reply);
    },
  );
}
