
import { FastifyInstance } from 'fastify';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../user/user.repository';
import { LoginSchema, RegisterSchema, SocialLoginSchema } from './auth.schema';
import { Type } from '@sinclair/typebox';
import { verifyRefreshToken, signToken } from '../../utils/jwt';
import { authMiddleware } from '../../middleware/auth.middleware';


export async function authRoutes(app: FastifyInstance) {
  const userRepo = new UserRepository();
  const service = new AuthService(userRepo);
  const controller = new AuthController(service);

  // Get profile route
  app.get('/auth/me', {
    schema: {
      tags: ['Auth'],
      summary: 'Get profile',
      description: 'Get current user profile',
    },
    preHandler: authMiddleware,
    handler: controller.me.bind(controller),
  });
  
  app.post('/auth/refresh-token', {
    schema: {
      tags: ['Auth'],
      summary: 'Refresh access token',
      description: 'Regenerate access token using refresh token',
      body: Type.Object({ refreshToken: Type.String() }),
      security: [],
    },
    handler: async (req: any, reply: any) => {
      const { refreshToken } = req.body as { refreshToken: string };
      try {
        const payload = verifyRefreshToken(refreshToken) as any;
        const accessToken = signToken({ userId: payload.userId });
        return reply.send({ accessToken });
      } catch (e) {
        return reply.status(401).send({ message: 'Invalid refresh token' });
      }
    },
  });

  app.post('/auth/login', {
    schema: {
      tags: ['Auth'],
      summary: 'Login',
      description: 'Authenticate user and return JWT',
      body: LoginSchema,
      security: [],
    },
    handler: controller.login.bind(controller),
  });

  app.post('/auth/register', {
    schema: {
      tags: ['Auth'],
      summary: 'Register',
      description: 'Register a new user',
      body: RegisterSchema,
      security: [],
    },
    handler: controller.register.bind(controller),
  });

  app.post('/auth/social-login', {
    schema: {
      tags: ['Auth'],
      summary: 'Login with Google or Facebook',
      description: 'Authenticate user with Google or Facebook and return JWT',
      body: SocialLoginSchema,
      security: [],
    },
    handler: controller.loginWithSocial.bind(controller),
  });
}


