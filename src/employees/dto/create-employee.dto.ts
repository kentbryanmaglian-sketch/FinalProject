import { IsEmail, IsIn, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @IsString() @MinLength(1) FirstName: string;
  @IsString() @MinLength(1) LastName: string;
  @IsEmail() Email: string;
  @IsString() @MinLength(8) Password: string;
  @IsString() Department: string;
  @IsString() Position: string;
  @IsOptional() @IsIn(['Employee', 'HR', 'Manager']) Role?: string;
}
