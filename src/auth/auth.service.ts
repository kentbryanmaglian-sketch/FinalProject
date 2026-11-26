import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { EmployeesService } from '../employees/employees.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private employees: EmployeesService, private jwt: JwtService) {}
  async register(dto: RegisterDto) {
    const employee = await this.employees.create({ ...dto, Role: 'Employee' });
    return { message: 'Account created successfully', employee };
  }
  async login(dto: LoginDto) {
    const employee = await this.employees.findByEmailForLogin(dto.Email);
    if (!employee || !(await bcrypt.compare(dto.Password, employee.Password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = { sub: employee.EmployeeID, email: employee.Email, role: employee.Role };
    return {
      access_token: await this.jwt.signAsync(payload),
      token_type: 'Bearer',
      employee: {
        EmployeeID: employee.EmployeeID,
        FirstName: employee.FirstName,
        LastName: employee.LastName,
        Email: employee.Email,
        Department: employee.Department,
        Position: employee.Position,
        Role: employee.Role,
      },
    };
  }
}
