import type { FastifyReply, FastifyRequest } from 'fastify';
import { LoginUserService } from '../../Service/Auth/LoginUserService';

class LoginUserController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    if (!email || !password) {
      reply.status(400).send({ message: 'All fields are required' });
    }

    try {
      const loginUserService = new LoginUserService();

      const login = await loginUserService.execute({ email, password });

      reply.send(login);
      // biome-ignore lint/suspicious/noExplicitAny: error type is unknown and may be any
    } catch (error: any) {
      return reply.status(400).send({ erro: true, message: error.message });
    }
  }
}

export { LoginUserController };
