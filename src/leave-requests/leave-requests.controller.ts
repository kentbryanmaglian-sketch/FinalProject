import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LeaveRequestsService } from './leave-requests.service';
import { CreateLeaveRequestDto, UpdateLeaveRequestDto } from './dto/leave-request.dto';

@Controller('leave-requests')
@UseGuards(AuthGuard('jwt'))
export class LeaveRequestsController {
  constructor(private readonly service: LeaveRequestsService) {}
  @Post() create(@Body() dto: CreateLeaveRequestDto) { return this.service.create(dto); }
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateLeaveRequestDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
