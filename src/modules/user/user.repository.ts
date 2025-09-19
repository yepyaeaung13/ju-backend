import { AppDataSource } from '../../config/db';
import { User } from './user.entity';

export class UserRepository {
  private repo = AppDataSource.getRepository(User);

  async findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  async create(data: Partial<User>) {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }
}
