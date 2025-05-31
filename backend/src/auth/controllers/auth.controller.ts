import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginRequestDto, RegisterRequestDto } from '../dtos/requests';
import { Public } from '../decorators/public.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'User successfully registered' })
  async register(@Body() createUserDto: RegisterRequestDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Successfully logged in' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  async login(@Body() loginDto: LoginRequestDto) {
    return this.authService.login(loginDto);
  }
}
