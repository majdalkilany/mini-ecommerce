import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Email must be valid.' })
  email: string = '';

  @ApiProperty({ example: 'StrongPassword123', description: 'User password' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(6, { message: 'Password must be at least 6 characters.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string = '';
}
