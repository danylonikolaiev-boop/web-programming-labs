import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import type { Task } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";

@Controller("tasks")
export class TasksController {
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

  @Get()
  findAll(): Task[] {
    return this.tasks; 
  }

  @Get("search")
  findByStatus(@Query("status") status?: string): Task[] {
    if (status) {
      return this.tasks.filter((task) => task.status === status);
    }
    return this.tasks; 
  }

  @Get(":id")
  findOne(@Param("id") id: string): Task | { message: string } {
    const task = this.tasks.find((t) => t.id === id);
    
    if (!task) {
      return { message: `Задачу з id ${id} не знайдено` };
    }
    
    return task;
  }

  @Post()
  create(@Body() dto: CreateTaskDto): Task {
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

  @Delete(":id")
  remove(@Param("id") id: string): { message: string } {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return { message: `Задачу з id ${id} не знайдено` };
    }

    this.tasks.splice(taskIndex, 1);
    
    return { message: `Задачу з id ${id} успішно видалено` };
  }
}