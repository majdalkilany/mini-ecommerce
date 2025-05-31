import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { User } from '../entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UserRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findByEmail(email);
  }

  async createUser(name: string, email: string, password: string): Promise<User> {
    const exists = await this.findByEmail(email);
    if (exists) throw new ConflictException('Email already in use.');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = { name, email, password: hashedPassword } as User;
    return this.userRepo.createOne(user);
  }

  async getById(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
