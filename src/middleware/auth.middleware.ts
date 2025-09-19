import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/jwt';

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  try {
    const auth = req.headers['authorization'];
    if (!auth) throw new Error('No token');
    const token = auth.replace('Bearer ', '');
    req.user = verifyToken(token);
  } catch (e) {
    return reply.status(401).send({ message: 'Unauthorized' });
  }
}
