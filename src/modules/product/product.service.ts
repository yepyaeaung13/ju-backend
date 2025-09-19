import { ProductRepository } from './product.repository';

export class ProductService {
  constructor(private productRepo: ProductRepository) {}

  async getAll() {
    return this.productRepo.findAll();
  }

  async getById(id: number) {
    return this.productRepo.findById(id);
  }

  async create(data: any) {
    return this.productRepo.create(data);
  }

  async update(id: number, data: any) {
    return this.productRepo.update(id, data);
  }

  async delete(id: number) {
    return this.productRepo.delete(id);
  }
}
