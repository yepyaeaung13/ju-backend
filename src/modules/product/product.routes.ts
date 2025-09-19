
import { FastifyInstance } from 'fastify';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { authMiddleware } from '../../middleware/auth.middleware';
import { ProductParamsSchema, ProductBodySchema } from './product.schema';

export async function productRoutes(app: FastifyInstance) {
  const repo = new ProductRepository();
  const service = new ProductService(repo);
  const controller = new ProductController(service);

  app.get('/products', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Product'],
      summary: 'Get all products',
      description: 'Returns a list of all products',
    },
  }, controller.getAll.bind(controller));

  app.get<{ Params: { id: string } }>('/products/:id', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Product'],
      summary: 'Get product by ID',
      description: 'Returns a product by its ID',
      params: ProductParamsSchema,
    },
  }, controller.getById.bind(controller));

  app.post('/products', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Product'],
      summary: 'Create product',
      description: 'Creates a new product',
      body: ProductBodySchema,
    },
  }, controller.create.bind(controller));

  app.put<{ Params: { id: string } }>('/products/:id', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Product'],
      summary: 'Update product',
      description: 'Updates a product by ID',
      params: ProductParamsSchema,
      body: ProductBodySchema,
    },
  }, controller.update.bind(controller));

  app.delete<{ Params: { id: string } }>('/products/:id', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Product'],
      summary: 'Delete product',
      description: 'Deletes a product by ID',
      params: ProductParamsSchema,
    },
  }, controller.delete.bind(controller));
}
