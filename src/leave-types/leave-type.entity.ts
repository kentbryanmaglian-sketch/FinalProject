import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LeaveRequest } from '../leave-requests/leave-request.entity';

@Entity('leave_types')
export class LeaveType {
  @PrimaryGeneratedColumn()
  LeaveTypeID: number;

  @Column({ length: 50, unique: true })
  LeaveTypeName: string;

  @Column({ type: 'text', nullable: true })
  Description: string;

  @Column({ type: 'int' })
  MaxDays: number;

  @OneToMany(() => LeaveRequest, (request) => request.LeaveType)
  LeaveRequests: LeaveRequest[];
}
