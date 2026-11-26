import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employees/employee.entity';
import { LeaveType } from './leave-types/leave-type.entity';
import { LeaveRequest } from './leave-requests/leave-request.entity';
import { Approval } from './approvals/approval.entity';
import { Notification } from './notifications/notification.entity';
import { EmployeesModule } from './employees/employees.module';
import { LeaveTypesModule } from './leave-types/leave-types.module';
import { LeaveRequestsModule } from './leave-requests/leave-requests.module';
import { ApprovalsModule } from './approvals/approvals.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST', 'localhost'),
        port: Number(config.get('DB_PORT', 3306)),
        username: config.get('DB_USERNAME', 'root'),
        password: config.get('DB_PASSWORD', ''),
        database: config.get('DB_DATABASE', 'employee_leave_management'),
        entities: [Employee, LeaveType, LeaveRequest, Approval, Notification],
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    EmployeesModule,
    LeaveTypesModule,
    LeaveRequestsModule,
    ApprovalsModule,
    NotificationsModule,
    AuthModule,
  ],
})
export class AppModule {}
