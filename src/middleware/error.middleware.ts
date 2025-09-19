import { FastifyReply, FastifyRequest } from 'fastify';

export function errorMiddleware(error: any, req: FastifyRequest, reply: FastifyReply) {
  reply.status(error.statusCode || 500).send({
    message: error.message || 'Internal Server Error',
  });
}
