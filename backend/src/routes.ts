import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserController } from './Controller/Auth/CreateUserController';
import { GetUserController } from './Controller/Auth/GetUserController';
import { LoginUserController } from './Controller/Auth/LoginUserController';
import { GenerateIAController } from './Controller/IA/GenerateIAController';
import { AddMomentsController } from './Controller/Moments/AddMomentsController';
import { GetAllMomentsController } from './Controller/Moments/GetAllMomentsController';
import { SearchMomentsController } from './Controller/Moments/SearchMomentsController';
import { UpdateMomentsController } from './Controller/Moments/UpdateMomentsController';
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

  // MOMENT: ADICIONAR UM NOVO MOMENTO
  fastify.post(
    '/add-registered-moment',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new AddMomentsController().handle(request, reply);
    },
  );

  // MOMENT: BUSCAR TODOS MOMENTOS POR USUÁRIO
  fastify.get(
    '/get-all-moments',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new GetAllMomentsController().handle(request, reply);
    },
  );

  // MOMENT: BUSCAR POR TERMOS
  fastify.get(
    '/search',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new SearchMomentsController().handle(request, reply);
    },
  );

  // MOMENT: EDITAR MOMENTOS
  fastify.put(
    '/edit-moments/:id',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateMomentsController().handle(request, reply);
    },
  );

  fastify.post('/ia', async (request: FastifyRequest, reply: FastifyReply) => {
    return new GenerateIAController().handle(request, reply);
  });
}
