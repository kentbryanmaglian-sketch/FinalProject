import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Approval } from './approval.entity';
import { CreateApprovalDto, UpdateApprovalDto } from './dto/approval.dto';
import { LeaveRequest } from '../leave-requests/leave-request.entity';
import { Employee } from '../employees/employee.entity';

@Injectable()
export class ApprovalsService {
  constructor(
    @InjectRepository(Approval) private repo: Repository<Approval>,
    @InjectRepository(LeaveRequest) private requests: Repository<LeaveRequest>,
    @InjectRepository(Employee) private employees: Repository<Employee>,
  ) {}
  async create(dto: CreateApprovalDto) {
    const request = await this.requests.findOne({ where: { LeaveRequestID: dto.LeaveRequestID } });
    if (!request) throw new NotFoundException('Leave request not found');
    const approver = await this.employees.findOne({ where: { EmployeeID: dto.ApproverID } });
    if (!approver) throw new NotFoundException('Approver employee not found');
    const approval = await this.repo.save(this.repo.create(dto));
    await this.requests.update(request.LeaveRequestID, { Status: dto.Decision });
    return approval;
  }
  findAll() { return this.repo.find({ relations: ['LeaveRequest', 'Approver'], order: { ApprovalID: 'ASC' } }); }
  async findOne(id: number) {
    const row = await this.repo.findOne({ where: { ApprovalID: id }, relations: ['LeaveRequest', 'Approver'] });
    if (!row) throw new NotFoundException('Approval not found');
    return row;
  }
  async update(id: number, dto: UpdateApprovalDto) {
    const row = await this.findOne(id);
    await this.repo.update(id, dto);
    if (dto.Decision) await this.requests.update(row.LeaveRequestID, { Status: dto.Decision });
    return this.findOne(id);
  }
  async remove(id: number) {
    const row = await this.findOne(id);
    await this.repo.remove(row);
    return { message: 'Approval deleted successfully' };
  }
}
