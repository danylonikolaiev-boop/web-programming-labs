import {
  Controller,
  Post,
  Get,
  Param,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { randomUUID } from 'crypto';
import { extname, join } from 'path';
import { FilesService } from './files.service';
import type { Response } from 'express';
import { promises as fs } from 'fs';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      // Видаляємо diskStorage, щоб файл залишався в пам'яті (у file.buffer)
      // Це дозволить ParseFilePipe (FileTypeValidator) перевірити магічні числа
      limits: {
        // Жорсткий ліміт на рівні Multer (5 МБ), обриває завантаження великого файлу завчасно
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5 МБ
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }), // Тільки зображення (перевірка магічних чисел)
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // 1. Генеруємо унікальне ім'я файлу
    const uniqueName = randomUUID() + extname(file.originalname);
    
    // 2. Зберігаємо файл на диск вручну
    const filePath = join(process.cwd(), 'uploads', uniqueName);
    await fs.writeFile(filePath, file.buffer);

    // 3. Збираємо метадані файлу
    const metadata = {
      originalName: file.originalname,
      generatedName: uniqueName,
      size: file.size,
      mimeType: file.mimetype,
      url: `http://localhost:3000/files/${uniqueName}`,
    };
    
    // 4. Зберігаємо метадані і повертаємо результат
    return this.filesService.saveFileMetadata(metadata);
  }

  @Get()
  getAllFiles() {
    return this.filesService.getAllFiles();
  }

  @Get(':name')
  getFile(@Param('name') name: string, @Res() res: Response) {
    const fileStream = this.filesService.getFileByName(name);
    
    const ext = extname(name).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.webp') contentType = 'image/webp';
    
    res.set({
      'Content-Type': contentType,
      'Content-Disposition': `inline; filename="${name}"`, 
    });
    
    fileStream.pipe(res);
  }
}
