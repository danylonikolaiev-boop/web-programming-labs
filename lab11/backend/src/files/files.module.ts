import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

@Module({
  controllers: [FilesController],
  providers: [FilesService],
})
export class FilesModule {
  constructor() {
    // Створюємо папку uploads, якщо вона ще не існує
    const uploadDir = join(process.cwd(), 'uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir);
    }
  }
}
