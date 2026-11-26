import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(@InjectRepository(Employee) private repo: Repository<Employee>) {}

  async create(dto: CreateEmployeeDto) {
    const existing = await this.repo.findOne({ where: { Email: dto.Email } });
    if (existing) throw new ConflictException('Email is already registered');
    const employee = this.repo.create({
      ...dto,
      Password: await bcrypt.hash(dto.Password, 10),
      Role: dto.Role || 'Employee',
    });
    const saved = await this.repo.save(employee);
    return this.safe(saved);
  }

  async findAll() {
    return (await this.repo.find({ order: { EmployeeID: 'ASC' } })).map((e) => this.safe(e));
  }

  async findOne(id: number) {
    const employee = await this.repo.findOne({ where: { EmployeeID: id } });
    if (!employee) throw new NotFoundException('Employee not found');
    return this.safe(employee);
  }

  async findByEmailForLogin(email: string) {
    return this.repo.createQueryBuilder('employee')
      .addSelect('employee.Password')
      .where('employee.Email = :email', { email })
      .getOne();
  }

  async update(id: number, dto: UpdateEmployeeDto) {
    const employee = await this.repo.findOne({ where: { EmployeeID: id } });
    if (!employee) throw new NotFoundException('Employee not found');
    if (dto.Email && dto.Email !== employee.Email) {
      const existing = await this.repo.findOne({ where: { Email: dto.Email } });
      if (existing) throw new ConflictException('Email is already registered');
    }
    const changes: any = { ...dto };
    if (dto.Password) changes.Password = await bcrypt.hash(dto.Password, 10);
    await this.repo.update(id, changes);
    return this.findOne(id);
  }

  async remove(id: number) {
    const employee = await this.repo.findOne({ where: { EmployeeID: id } });
    if (!employee) throw new NotFoundException('Employee not found');
    await this.repo.remove(employee);
    return { message: 'Employee deleted successfully' };
  }

  private safe(employee: Employee) {
    const { Password, ...safeEmployee } = employee as any;
    return safeEmployee;
  }
}
