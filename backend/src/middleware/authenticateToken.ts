import type { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';

export async function authenticateToken(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  // biome-ignore lint/complexity/useLiteralKeys: false positive
  const authHeader = request.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return reply.status(400).send({ message: 'Token not provided' });

  try {
    // biome-ignore lint/style/noNonNullAssertion: false positive
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
      userId: string;
    };

    request.user = decoded;
    // biome-ignore lint/correctness/noUnusedVariables: false positive
  } catch (error) {
    return reply.status(400).send({ message: 'Invalid token' });
  }
}
