import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { Repository, In } from 'typeorm';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  /*private tasks: Task[] = [
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
  */

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['tags'] });
  }

  async findByStatus(status: any): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { status },
      relations: ['tags'],
    });
  }

  async findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
  }

  async create(dto: CreateTaskDto): Promise<Task> {
    let tags: Tag[] = [];
    if (dto.tagIds && dto.tagIds.length > 0) {
      tags = await this.tagsRepository.findBy({ id: In(dto.tagIds) });
    }

    const newTask = this.tasksRepository.create({
      title: dto.title,
      description: dto.description,
      priority: dto.priority,
      tags: tags, 
    });

    return this.tasksRepository.save(newTask);
  }

  async update(id: number, dto: UpdateTaskDto): Promise<Task | null> {
    const task = await this.findOne(id);
    if (!task) return null;

    Object.assign(task, dto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.tasksRepository.delete(id);
    return result.affected !== 0;
  }
}