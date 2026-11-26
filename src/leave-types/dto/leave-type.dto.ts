import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateLeaveTypeDto {
  @IsString() LeaveTypeName: string;
  @IsOptional() @IsString() Description?: string;
  @IsInt() @Min(1) MaxDays: number;
}
export class UpdateLeaveTypeDto {
  @IsOptional() @IsString() LeaveTypeName?: string;
  @IsOptional() @IsString() Description?: string;
  @IsOptional() @IsInt() @Min(1) MaxDays?: number;
}
