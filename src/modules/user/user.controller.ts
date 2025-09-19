import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from './user.service';

export class UserController {
  constructor(private userService: UserService) {}

  async getProfile(req: FastifyRequest, reply: FastifyReply) {
    // ...get user from JWT, fetch profile
    return reply.send({ message: 'User profile' });
  }
}
