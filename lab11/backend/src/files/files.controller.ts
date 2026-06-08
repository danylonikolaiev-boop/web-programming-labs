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
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|webp)' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const uniqueName = randomUUID() + extname(file.originalname);
    
    const filePath = join(process.cwd(), 'uploads', uniqueName);
    await fs.writeFile(filePath, file.buffer);

    const metadata = {
      originalName: file.originalname,
      generatedName: uniqueName,
      size: file.size,
      mimeType: file.mimetype,
      url: `http://localhost:3000/files/${uniqueName}`,
    };
    
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
