import { AuthService } from './auth.service';
import { LoginInput, RegisterInput, SocialLoginInput } from './auth.schema';

import { FastifyReply, FastifyRequest } from 'fastify';
import { responseSuccess, responseError } from '../../utils/response';

export class AuthController {
  constructor(private authService: AuthService) {}

  async me(req: FastifyRequest, reply: FastifyReply) {
    try {
      const user = req.user;
      if (!user) throw new Error('Unauthorized');
      // Remove sensitive info if needed
      const { password, ...userWithoutPassword } = user;
      return reply.send(responseSuccess(userWithoutPassword));
    } catch (error) {
      return reply.status(401).send(responseError(error));
    }
  }
  
  async login(req: FastifyRequest<{ Body: LoginInput }>, reply: FastifyReply) {
    try {
      const token = await this.authService.login(req.body);
      return reply.send(responseSuccess(token));
    } catch (error) {
      return reply.status(401).send(responseError(error));
    }
  }

  async register(req: FastifyRequest<{ Body: RegisterInput }>, reply: FastifyReply) {
    try {
      const user = await this.authService.register(req.body);
      return reply.send(responseSuccess(user));
    } catch (error) {
      return reply.status(400).send(responseError(error));
    }
  }

  async loginWithSocial(req: FastifyRequest<{ Body: SocialLoginInput }>, reply: FastifyReply) {
    try {
      const token = await this.authService.loginWithSocial(req.body);
      return reply.send(responseSuccess(token));
    } catch (error) {
      return reply.status(401).send(responseError(error));
    }
  }
}
