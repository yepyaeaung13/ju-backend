
import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { ENV } from '../config/env';
import { SwaggerUserRepository } from '../modules/user/swagger-user.repository';

export async function registerSwagger(app: FastifyInstance) {
  await app.register(fastifySwagger as any, {
    openapi: {
      info: {
        title: 'API Documentation',
        description: 'API documentation with Swagger',
        version: '1.0.0',
      },
      servers: [
        { url: ENV.SWAGGER_HOST, description: 'api server' },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        { bearerAuth: [] }
      ],
    },
  });

  await app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      // docExpansion: 'full',
      deepLinking: false,
    },
  });

  // Manual email/password protection for /docs
  app.addHook('onRequest', async (req, reply) => {
    if (req.raw.url?.startsWith('/docs')) {
      const auth = req.headers['authorization'];
      if (!auth || !auth.startsWith('Basic ')) {
        reply.header('WWW-Authenticate', 'Basic realm="Swagger Docs"');
        return reply.status(401).send('Authentication required');
      }
      const base64 = auth.replace('Basic ', '');
      const [email, password] = Buffer.from(base64, 'base64').toString().split(':');
      if (!email || !password) {
        reply.header('WWW-Authenticate', 'Basic realm="Swagger Docs"');
        return reply.status(401).send('Invalid credentials');
      }
      const swaggerUserRepo = new SwaggerUserRepository();
      const user = await swaggerUserRepo.findByEmail(email);
      if (!user || user.password !== password) {
        reply.header('WWW-Authenticate', 'Basic realm="Swagger Docs"');
        return reply.status(401).send('Invalid credentials');
      }
      // Approved, continue to docs
    }
  });
}
