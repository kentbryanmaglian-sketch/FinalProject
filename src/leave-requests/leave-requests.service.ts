import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest } from './leave-request.entity';
import { CreateLeaveRequestDto, UpdateLeaveRequestDto } from './dto/leave-request.dto';
import { Employee } from '../employees/employee.entity';
import { LeaveType } from '../leave-types/leave-type.entity';

@Injectable()
export class LeaveRequestsService {
  constructor(
    @InjectRepository(LeaveRequest) private repo: Repository<LeaveRequest>,
    @InjectRepository(Employee) private employees: Repository<Employee>,
    @InjectRepository(LeaveType) private types: Repository<LeaveType>,
  ) {}
  async create(dto: CreateLeaveRequestDto) {
    if (dto.EndDate < dto.StartDate) throw new BadRequestException('EndDate must be on or after StartDate');
    const employee = await this.employees.findOne({ where: { EmployeeID: dto.EmployeeID } });
    if (!employee) throw new NotFoundException('Employee not found');
    const type = await this.types.findOne({ where: { LeaveTypeID: dto.LeaveTypeID } });
    if (!type) throw new NotFoundException('Leave type not found');
    return this.repo.save(this.repo.create({ ...dto, Status: 'Pending' }));
  }
  findAll() { return this.repo.find({ relations: ['Employee', 'LeaveType'], order: { LeaveRequestID: 'ASC' } }); }
  async findOne(id: number) {
    const row = await this.repo.findOne({ where: { LeaveRequestID: id }, relations: ['Employee', 'LeaveType'] });
    if (!row) throw new NotFoundException('Leave request not found');
    return row;
  }
  async update(id: number, dto: UpdateLeaveRequestDto) {
    const current = await this.findOne(id);
    const start = dto.StartDate || current.StartDate;
    const end = dto.EndDate || current.EndDate;
    if (end < start) throw new BadRequestException('EndDate must be on or after StartDate');
    if (dto.LeaveTypeID) await this.types.findOne({ where: { LeaveTypeID: dto.LeaveTypeID } }).then((x) => {
      if (!x) throw new NotFoundException('Leave type not found');
    });
    await this.repo.update(id, dto);
    return this.findOne(id);
  }
  async remove(id: number) {
    const row = await this.findOne(id);
    await this.repo.remove(row);
    return { message: 'Leave request deleted successfully' };
  }
}
