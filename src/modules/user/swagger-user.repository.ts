import { AppDataSource } from '../../config/db';
import { SwaggerUser } from './swagger-user.entity';

export class SwaggerUserRepository {
  private repo = AppDataSource.getRepository(SwaggerUser);

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async create(data: Partial<SwaggerUser>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
