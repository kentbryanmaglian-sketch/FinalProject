import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateNotificationDto {
  @IsInt() @Min(1) EmployeeID: number;
  @IsInt() @Min(1) LeaveRequestID: number;
  @IsString() Message: string;
}
export class UpdateNotificationDto {
  @IsOptional() @IsString() Message?: string;
  @IsOptional() @IsBoolean() IsRead?: boolean;
}
