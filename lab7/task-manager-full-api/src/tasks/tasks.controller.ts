import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get('search')
  findByStatus(@Query('status') status?: string) {
    if (status) {
      return this.tasksService.findByStatus(status);
    }
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const task = this.tasksService.findOne(id);
    
    if (!task) {
      throw new NotFoundException(`Задачу з id ${id} не знайдено`);
    }
    
    return task;
  }

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    // Post автоматично повертає статус 201 Created
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: any) {
    const updatedTask = this.tasksService.update(id, updateTaskDto);
    
    if (!updatedTask) {
      throw new NotFoundException(`Задачу з id ${id} не знайдено`);
    }
    
    return updatedTask;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    const isDeleted = this.tasksService.remove(id);
    
    if (!isDeleted) {
      throw new NotFoundException(`Задачу з id ${id} не знайдено`);
    }
    
  }
}