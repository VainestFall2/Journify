import type { FastifyReply, FastifyRequest } from 'fastify';
import { GetAllMomentsService } from '../../Service/Moments/GetAllMomentsService';

class GetAllMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { user } = request;

    if (!user) {
      throw new Error('User does not exists!');
    }

    try {
      const getAllMomentsService = new GetAllMomentsService();
      const getAllMoments = await getAllMomentsService.execute({ user });

      reply.status(200).send({ memories: getAllMoments });
      // biome-ignore lint/suspicious/noExplicitAny: using any for error object
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message });
    }
  }
}

export { GetAllMomentsController };
