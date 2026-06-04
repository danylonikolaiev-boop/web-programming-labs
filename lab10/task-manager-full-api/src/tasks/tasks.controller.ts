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
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get('search')
  async findByStatus(@Query('status') status?: string) {
    if (status) {
      return await this.tasksService.findByStatus(status);
    }
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(+id);
    if (!task) throw new NotFoundException(`Задачу з id ${id} не знайдено`);
    return task;
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.tasksService.update(+id, updateTaskDto);
    if (!updatedTask) throw new NotFoundException(`Задачу з id ${id} не знайдено`);
    return updatedTask;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isDeleted = await this.tasksService.remove(+id);
    if (!isDeleted) throw new NotFoundException(`Задачу з id ${id} не знайдено`);
  }
}