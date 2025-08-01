import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { CreateUserController } from './Controller/Auth/CreateUserController';
import { GetUserController } from './Controller/Auth/GetUserController';
import { LoginUserController } from './Controller/Auth/LoginUserController';
import { GenerateIAController } from './Controller/IA/GenerateIAController';
import { AddMomentsController } from './Controller/Moments/AddMomentsController';
import { DateFilterMomentsController } from './Controller/Moments/DateFilterMomentsController';
import { DeleteMomentsController } from './Controller/Moments/DeleteMomentsController';
import { GetAllMomentsController } from './Controller/Moments/GetAllMomentsController';
import { SearchMomentsController } from './Controller/Moments/SearchMomentsController';
import { UpdateIsFavoriteMomentsController } from './Controller/Moments/UpdateIsFavoriteMomentsController';
import { UpdateMomentsController } from './Controller/Moments/UpdateMomentsController';
import { DeleteFileController } from './Controller/Upload/DeleteFileController';
import { UploadFileController } from './Controller/Upload/UploadFileController';
import { upload } from './config/multer';
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

  // MOMENT: DELETAR MOMENTOS
  fastify.delete(
    '/delete-moment/:id',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteMomentsController().handle(request, reply);
    },
  );

  // MOMENT: ATUALIZAR OS FAVORITOS DO MOMENTO
  fastify.put(
    '/update-is-favorite/:id',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UpdateIsFavoriteMomentsController().handle(request, reply);
    },
  );

  // MOMENT: FILTRAR OS MOMENTOS POR DATA
  fastify.get(
    '/registered-moment/filter',
    { preHandler: authenticateToken },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DateFilterMomentsController().handle(request, reply);
    },
  );

  // IA: INTEGRAÇÃO COM IA
  fastify.post('/ia', async (request: FastifyRequest, reply: FastifyReply) => {
    return new GenerateIAController().handle(request, reply);
  });

  // UPLOAD: ADICIONAR IMAGEM
  fastify.post(
    '/image-upload',
    { preHandler: upload.single('image') },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new UploadFileController().handle(request, reply);
    },
  );

  // UPLOAD: DELETAR IMAGEM
  fastify.delete(
    '/delete-upload',
    { preHandler: upload.single('image') },
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new DeleteFileController().handle(request, reply);
    },
  );
}
