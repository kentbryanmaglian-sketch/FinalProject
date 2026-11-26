import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Employee } from '../employees/employee.entity';
import { LeaveRequest } from '../leave-requests/leave-request.entity';

@Entity('notifications')
export class Notification {
  @PrimaryGeneratedColumn()
  NotificationID: number;

  @Column()
  EmployeeID: number;

  @Column()
  LeaveRequestID: number;

  @ManyToOne(() => Employee, (employee) => employee.Notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'EmployeeID', referencedColumnName: 'EmployeeID' })
  Employee: Employee;

  @ManyToOne(() => LeaveRequest, (request) => request.Notifications, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'LeaveRequestID', referencedColumnName: 'LeaveRequestID' })
  LeaveRequest: LeaveRequest;

  @Column({ length: 255 })
  Message: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  DateSent: Date;

  @Column({ type: 'boolean', default: false })
  IsRead: boolean;
}
