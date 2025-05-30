import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString, MinLength, Length, IsNotEmpty } from 'class-validator';
import { UserRole } from '../../enums';

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 30;
const PASSWORD_MIN_LENGTH = 6;

export class CreateUserDto {
  @ApiPropertyOptional({ description: 'Full name of the user', example: 'Majd Alkilany' })
  @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH, {
    message: `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters.`,
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name is required.' })
  name!: string;

  @ApiPropertyOptional({ description: 'Email address', example: 'majd@example.com' })
  @IsEmail({}, { message: 'Email must be a valid email address.' })
  @IsNotEmpty({ message: 'Email is required.' })
  email!: string;

  @ApiPropertyOptional({ description: 'User password', example: 'StrongPass123' })
  @MinLength(PASSWORD_MIN_LENGTH, { message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.` })
  @IsString({ message: 'Password must be a string.' })
  @IsNotEmpty({ message: 'Password is required.' })
  password!: string;

  @ApiPropertyOptional({ description: 'User role', enum: UserRole, example: UserRole.ADMIN })
  @IsOptional()
  @IsEnum(UserRole, { message: 'Role must be one of the defined enum values.' })
  role?: UserRole;
}
