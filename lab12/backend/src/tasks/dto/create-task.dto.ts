import { IsString, IsNotEmpty, IsOptional, IsEnum, IsArray, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: 'Назва задачі не може бути порожньою' })
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['low', 'medium', 'high'], { message: 'Пріоритет має бути low, medium або high' })
  priority: 'low' | 'medium' | 'high';

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  tagIds?: number[];
}