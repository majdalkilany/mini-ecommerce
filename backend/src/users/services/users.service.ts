import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { UpdateResult } from 'typeorm';
import { UpdateUserDto } from '../dtos/requests';
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
}
