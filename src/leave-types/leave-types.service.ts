import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveType } from './leave-type.entity';
import { CreateLeaveTypeDto, UpdateLeaveTypeDto } from './dto/leave-type.dto';

@Injectable()
export class LeaveTypesService {
  constructor(@InjectRepository(LeaveType) private repo: Repository<LeaveType>) {}
  async create(dto: CreateLeaveTypeDto) {
    const found = await this.repo.findOne({ where: { LeaveTypeName: dto.LeaveTypeName } });
    if (found) throw new ConflictException('Leave type already exists');
    return this.repo.save(this.repo.create(dto));
  }
  findAll() { return this.repo.find({ order: { LeaveTypeID: 'ASC' } }); }
  async findOne(id: number) {
    const row = await this.repo.findOne({ where: { LeaveTypeID: id } });
    if (!row) throw new NotFoundException('Leave type not found');
    return row;
  }
  async update(id: number, dto: UpdateLeaveTypeDto) {
    await this.findOne(id);
    await this.repo.update(id, dto);
    return this.findOne(id);
  }
  async remove(id: number) {
    const row = await this.findOne(id);
    await this.repo.remove(row);
    return { message: 'Leave type deleted successfully' };
  }
}
