import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { LeaveRequest } from '../leave-requests/leave-request.entity';
import { Approval } from '../approvals/approval.entity';
import { Notification } from '../notifications/notification.entity';

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn()
  EmployeeID: number;

  @Column({ length: 50 })
  FirstName: string;

  @Column({ length: 50 })
  LastName: string;

  @Column({ length: 100, unique: true })
  Email: string;

  @Column({ length: 255, select: false })
  Password: string;

  @Column({ length: 100 })
  Department: string;

  @Column({ length: 100 })
  Position: string;

  @Column({ length: 20, default: 'Employee' })
  Role: string;

  @OneToMany(() => LeaveRequest, (request) => request.Employee)
  LeaveRequests: LeaveRequest[];

  @OneToMany(() => Approval, (approval) => approval.Approver)
  Approvals: Approval[];

  @OneToMany(() => Notification, (notification) => notification.Employee)
  Notifications: Notification[];
}
