import {
  IsEmail,
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email must be valid' })
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Birth date must be a valid ISO date string' })
  birth_date?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsNumber({}, { message: 'Weight must be a number' })
  @Min(0)
  weight?: number;

  @IsOptional()
  @IsNumber({}, { message: 'Height must be a number' })
  @Min(0)
  height?: number;

  @IsOptional()
  @IsDateString({}, { message: 'Registration date must be a valid ISO date string' })
  registration_date?: string;

  @IsOptional()
  @IsString()
  goal?: string;

  @IsOptional()
  @IsString()
  experience_level?: string;
}