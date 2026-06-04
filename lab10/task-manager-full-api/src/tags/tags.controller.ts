import { 
  Controller, Get, Post, Body, Patch, Param, Delete, 
  HttpCode, HttpStatus, NotFoundException, BadRequestException 
} from '@nestjs/common';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body('name') name: string) {
    if (!name) throw new BadRequestException('Ім\'я тега є обов\'язковим');
    return await this.tagsService.create(name);
  }

  @Get()
  async findAll() {
    return await this.tagsService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body('name') name: string) {
    if (!name) throw new BadRequestException('Ім\'я тега є обов\'язковим');
    const updatedTag = await this.tagsService.update(+id, name);
    
    if (!updatedTag) throw new NotFoundException(`Тег з id ${id} не знайдено`);
    return updatedTag;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const isDeleted = await this.tagsService.remove(+id);
    if (!isDeleted) throw new NotFoundException(`Тег з id ${id} не знайдено`);
  }
}