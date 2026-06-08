import { Injectable, NotFoundException } from '@nestjs/common';
import { createReadStream, existsSync } from 'fs';
import { join } from 'path';

export interface FileMetadata {
  originalName: string;
  generatedName: string;
  size: number;
  mimeType: string;
  url: string;
}

@Injectable()
export class FilesService {
  private files: FileMetadata[] = [];

  saveFileMetadata(metadata: FileMetadata) {
    this.files.push(metadata);
    return metadata;
  }

  getAllFiles() {
    return this.files;
  }

  getFileByName(name: string) {
    const filePath = join(process.cwd(), 'uploads', name);
    if (!existsSync(filePath)) {
      throw new NotFoundException('Файл не знайдено');
    }
    return createReadStream(filePath);
  }
}
