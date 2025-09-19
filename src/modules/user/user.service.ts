import { UserRepository } from './user.repository';

export class UserService {
  constructor(private userRepo: UserRepository) {}

  async getUserByEmail(email: string) {
    return this.userRepo.findByEmail(email);
  }
}
