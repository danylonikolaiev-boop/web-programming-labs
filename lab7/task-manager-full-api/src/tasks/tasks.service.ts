import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    { id: '1', title: 'Вивчити основи NestJS', description: 'Пройти перші 5 етапів', status: 'done', priority: 'high', createdAt: '2026-04-01T10:00:00.000Z' },
    { id: '2', title: 'Створити мод для Terraria', description: 'Додати боса', status: 'in-progress', priority: 'high', createdAt: '2026-04-02T12:00:00.000Z' },
    { id: '3', title: 'Налаштувати сервер Minecraft', description: 'Локальне оточення', status: 'pending', priority: 'medium', createdAt: '2026-04-02T14:30:00.000Z' }
  ];

  findAll(): Task[] {
    return this.tasks;
  }

  findByStatus(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  findOne(id: string): Task | null {
    const task = this.tasks.find((t) => t.id === id);
    return task || null; 
  }

  create(dto: CreateTaskDto): Task {
    const newTask: Task = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description || "",
      status: "pending",
      priority: dto.priority,
      createdAt: new Date().toISOString(),
    };
    this.tasks.push(newTask);
    return newTask;
  }

  update(id: string, dto: any): Task | null {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    
    if (taskIndex === -1) {
      return null;
    }

    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...dto,
    };
    
    return this.tasks[taskIndex];
  }

  remove(id: string): boolean {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);
    
    if (taskIndex === -1) {
      return false;
    }

    this.tasks.splice(taskIndex, 1);
    return true;
  }
}