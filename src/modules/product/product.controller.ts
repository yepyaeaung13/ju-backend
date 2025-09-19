import { ProductService } from './product.service';

import { FastifyReply, FastifyRequest } from 'fastify';
import { responseSuccess, responseError } from '../../utils/response';

export class ProductController {
  constructor(private productService: ProductService) {}

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    try {
      const products = await this.productService.getAll();
      return reply.send(responseSuccess(products));
    } catch (error) {
      return reply.status(500).send(responseError(error));
    }
  }

  async getById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const product = await this.productService.getById(Number(req.params.id));
      return reply.send(responseSuccess(product));
    } catch (error) {
      return reply.status(404).send(responseError(error));
    }
  }

  async create(req: FastifyRequest, reply: FastifyReply) {
    try {
      const product = await this.productService.create(req.body);
      return reply.send(responseSuccess(product));
    } catch (error) {
      return reply.status(400).send(responseError(error));
    }
  }

  async update(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const product = await this.productService.update(Number(req.params.id), req.body);
      return reply.send(responseSuccess(product));
    } catch (error) {
      return reply.status(400).send(responseError(error));
    }
  }

  async delete(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      await this.productService.delete(Number(req.params.id));
      return reply.send(responseSuccess(null, {}, 'Deleted'));
    } catch (error) {
      return reply.status(400).send(responseError(error));
    }
  }
}
