import { IsDateString, IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateLeaveRequestDto {
  @IsInt() @Min(1) EmployeeID: number;
  @IsInt() @Min(1) LeaveTypeID: number;
  @IsDateString() StartDate: string;
  @IsDateString() EndDate: string;
  @IsString() Reason: string;
}
export class UpdateLeaveRequestDto {
  @IsOptional() @IsInt() @Min(1) LeaveTypeID?: number;
  @IsOptional() @IsDateString() StartDate?: string;
  @IsOptional() @IsDateString() EndDate?: string;
  @IsOptional() @IsString() Reason?: string;
  @IsOptional() @IsIn(['Pending', 'Approved', 'Rejected']) Status?: string;
}
