import { IsIn, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateApprovalDto {
  @IsInt() @Min(1) LeaveRequestID: number;
  @IsInt() @Min(1) ApproverID: number;
  @IsIn(['Approved', 'Rejected']) Decision: string;
  @IsOptional() @IsString() Comments?: string;
}
export class UpdateApprovalDto {
  @IsOptional() @IsIn(['Approved', 'Rejected']) Decision?: string;
  @IsOptional() @IsString() Comments?: string;
}
