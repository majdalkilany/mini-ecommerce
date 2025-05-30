import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from '~/users/services/users.service';
import { RegisterRequestDto, LoginRequestDto } from '../dtos/requests';
import { User } from '~/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    const passwordMatch = user && (await bcrypt.compare(password, user.password));
    if (!passwordMatch) throw new UnauthorizedException('Invalid email or password');
    return user;
  }

  async login(data: LoginRequestDto) {
    const user = await this.validateUser(data.email, data.password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(data: RegisterRequestDto) {
    const user = await this.usersService.createUser(data.name, data.email, data.password);
    const payload = { sub: user.id, email: user.email, role: user.role };
    return { access_token: this.jwtService.sign(payload) };
  }
}
