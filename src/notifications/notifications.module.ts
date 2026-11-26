import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './notification.entity';
import { Employee } from '../employees/employee.entity';
import { LeaveRequest } from '../leave-requests/leave-request.entity';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Employee, LeaveRequest])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {}
