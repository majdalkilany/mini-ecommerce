import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength, Length } from 'class-validator';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 6;

export class RegisterRequestDto {
  @ApiProperty({ example: 'Majd Alkilany', description: 'Full name of the user' })
  @IsString({ message: 'Name must be a string.' })
  @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH, {
    message: `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters.`,
  })
  @IsNotEmpty({ message: 'Name is required.' })
  name: string = '';

  @ApiProperty({ example: 'majd@example.com', description: 'User email' })
  @IsEmail({}, { message: 'Email must be valid.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email: string = '';

  @ApiProperty({ example: 'StrongPassword123', description: 'Password' })
  @IsString({ message: 'Password must be a string.' })
  @MinLength(PASSWORD_MIN_LENGTH, { message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.` })
  @IsNotEmpty({ message: 'Password is required.' })
  password: string = '';
}
