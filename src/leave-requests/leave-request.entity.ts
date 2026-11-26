import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../employees/employee.entity';
import { LeaveType } from '../leave-types/leave-type.entity';
import { Approval } from '../approvals/approval.entity';
import { Notification } from '../notifications/notification.entity';

@Entity('leave_requests')
export class LeaveRequest {
  @PrimaryGeneratedColumn()
  LeaveRequestID: number;

  @Column()
  EmployeeID: number;

  @Column()
  LeaveTypeID: number;

  @ManyToOne(() => Employee, (employee) => employee.LeaveRequests, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'EmployeeID', referencedColumnName: 'EmployeeID' })
  Employee: Employee;

  @ManyToOne(() => LeaveType, (type) => type.LeaveRequests, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'LeaveTypeID', referencedColumnName: 'LeaveTypeID' })
  LeaveType: LeaveType;

  @Column({ type: 'date' })
  StartDate: string;

  @Column({ type: 'date' })
  EndDate: string;

  @Column({ type: 'text' })
  Reason: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  RequestDate: Date;

  @Column({ length: 20, default: 'Pending' })
  Status: string;

  @OneToMany(() => Approval, (approval) => approval.LeaveRequest)
  Approvals: Approval[];

  @OneToMany(() => Notification, (notification) => notification.LeaveRequest)
  Notifications: Notification[];
}
