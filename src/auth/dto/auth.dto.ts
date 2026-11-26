import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString() FirstName: string;
  @IsString() LastName: string;
  @IsEmail() Email: string;
  @IsString() @MinLength(8) Password: string;
  @IsString() Department: string;
  @IsString() Position: string;
}
export class LoginDto {
  @IsEmail() Email: string;
  @IsString() Password: string;
}
