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
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { FilesService } from './files.service';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // Генеруємо унікальне ім'я за допомогою UUID, залишаючи оригінальне розширення
          const uniqueName = uuidv4() + extname(file.originalname);
          cb(null, uniqueName);
        },
      }),
      limits: {
        // Жорсткий ліміт на рівні Multer (5 МБ), щоб не завантажувати великі файли в пам'ять
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), // 5 МБ
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }), // Тільки зображення
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    // Збираємо метадані файлу
    const metadata = {
      originalName: file.originalname,
      generatedName: file.filename,
      size: file.size,
      mimeType: file.mimetype,
      url: `http://localhost:3000/files/${file.filename}`,
    };
    
    // Зберігаємо метадані і повертаємо результат
    return this.filesService.saveFileMetadata(metadata);
  }

  @Get()
  getAllFiles() {
    return this.filesService.getAllFiles();
  }

  @Get(':name')
  getFile(@Param('name') name: string, @Res() res: Response) {
    const fileStream = this.filesService.getFileByName(name);
    
    // Визначаємо Content-Type для правильного відображення в браузері
    const ext = extname(name).toLowerCase();
    let contentType = 'application/octet-stream';
    if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
    else if (ext === '.webp') contentType = 'image/webp';
    
    res.set({
      'Content-Type': contentType,
      // inline дозволяє переглядати файл в браузері замість скачування
      'Content-Disposition': `inline; filename="${name}"`, 
    });
    
    // Відправляємо файл
    fileStream.pipe(res);
  }
}
