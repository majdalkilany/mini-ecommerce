import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/guards';
import { CurrentUser } from '~/auth/decorators';
import { JwtPayload } from '~/auth/interfaces';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getCurrentUser(@CurrentUser() user: JwtPayload) {
    return user;
  }
}
