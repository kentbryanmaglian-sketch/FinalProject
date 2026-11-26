import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notification.entity';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/notification.dto';
import { Employee } from '../employees/employee.entity';
import { LeaveRequest } from '../leave-requests/leave-request.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification) private repo: Repository<Notification>,
    @InjectRepository(Employee) private employees: Repository<Employee>,
    @InjectRepository(LeaveRequest) private requests: Repository<LeaveRequest>,
  ) {}
  async create(dto: CreateNotificationDto) {
    const employee = await this.employees.findOne({ where: { EmployeeID: dto.EmployeeID } });
    if (!employee) throw new NotFoundException('Employee not found');
    const request = await this.requests.findOne({ where: { LeaveRequestID: dto.LeaveRequestID } });
    if (!request) throw new NotFoundException('Leave request not found');
    return this.repo.save(this.repo.create(dto));
  }
  findAll() { return this.repo.find({ relations: ['Employee', 'LeaveRequest'], order: { NotificationID: 'ASC' } }); }
  async findOne(id: number) {
    const row = await this.repo.findOne({ where: { NotificationID: id }, relations: ['Employee', 'LeaveRequest'] });
    if (!row) throw new NotFoundException('Notification not found');
    return row;
  }
  async update(id: number, dto: UpdateNotificationDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }
  async remove(id: number) {
    const row = await this.findOne(id);
    await this.repo.remove(row);
    return { message: 'Notification deleted successfully' };
  }
}
