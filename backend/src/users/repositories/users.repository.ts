// src/users/repositories/user.repository.ts
import { Injectable } from '@nestjs/common';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async createOne(data: DeepPartial<User>): Promise<User> {
    const user = this.create(data);
    return this.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.findOneBy({ id });
  }
}
