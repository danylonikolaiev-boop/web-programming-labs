import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
        id: "1",
        title: "Створити wireframes для головної сторінки",
        description: "Розробити чорнові ескізи структури головної сторінки нового інтернет-магазину в Figma для узгодження з клієнтом.",
        status: "done",
        priority: "high",
        createdAt: '2026-04-02T12:00:00.000Z' 
    },
    {
        id: "2",
        title: "Розробка UI-кіта (UI Kit)",
        description: "Підібрати кольорову палітру, типографіку та створити базові компоненти (кнопки, інпути, картки товарів).",
        status: "in-progress",
        priority: "high",
        createdAt: '2026-04-02T12:00:00.000Z' 
    },
    {
        id: "3",
        title: "А/В тестування кнопок CTA",
        description: "Підготувати два варіанти дизайну кнопок Call-to-Action (різні кольори та розміщення) для перевірки конверсії.",
        status: 'pending',
        priority: "medium",
        createdAt: '2026-04-02T12:00:00.000Z' 
    }
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