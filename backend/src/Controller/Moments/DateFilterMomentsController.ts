import type { FastifyReply, FastifyRequest } from 'fastify';
import { DateFilterMomentsService } from '../../Service/Moments/DateFilterMomentsService';

class DateFilterMomentsController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { startDate, endDate } = request.query as {
      startDate: string;
      endDate: string;
    };
    const { user } = request;

    if (!user) {
      return reply
        .status(400)
        .send({ error: true, message: 'User does not exists!' });
    }

    try {
      const dateFilterMomentsService = new DateFilterMomentsService();
      const dateFiltered = await dateFilterMomentsService.execute({
        startDate,
        endDate,
        user,
      });

      reply.status(200).send({ moment: dateFiltered });
      // biome-ignore lint/suspicious/noExplicitAny: necessary to handle unknown error types
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message });
    }
  }
}

export { DateFilterMomentsController };
