import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateEmployeeDto {
  @IsOptional() @IsString() FirstName?: string;
  @IsOptional() @IsString() LastName?: string;
  @IsOptional() @IsEmail() Email?: string;
  @IsOptional() @IsString() @MinLength(8) Password?: string;
  @IsOptional() @IsString() Department?: string;
  @IsOptional() @IsString() Position?: string;
  @IsOptional() @IsIn(['Employee', 'HR', 'Manager']) Role?: string;
}
