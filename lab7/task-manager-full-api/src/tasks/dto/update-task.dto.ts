import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'done'], { message: 'Недійсний статус' })
  status?: 'pending' | 'in-progress' | 'done';
}