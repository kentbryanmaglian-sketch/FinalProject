import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LeaveRequest } from '../leave-requests/leave-request.entity';
import { Employee } from '../employees/employee.entity';

@Entity('approvals')
export class Approval {
  @PrimaryGeneratedColumn()
  ApprovalID: number;

  @Column()
  LeaveRequestID: number;

  @Column()
  ApproverID: number;

  @ManyToOne(() => LeaveRequest, (request) => request.Approvals, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'LeaveRequestID', referencedColumnName: 'LeaveRequestID' })
  LeaveRequest: LeaveRequest;

  @ManyToOne(() => Employee, (employee) => employee.Approvals, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'ApproverID', referencedColumnName: 'EmployeeID' })
  Approver: Employee;

  @Column({ length: 20 })
  Decision: string;

  @Column({ type: 'text', nullable: true })
  Comments: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  ApprovalDate: Date;
}
