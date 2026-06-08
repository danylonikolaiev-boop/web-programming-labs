import { Injectable } from '@nestjs/common';

export interface FileMetadata {
  originalName: string;
  savedName: string;
  size: number;
  mimeType: string;
  url: string;
}

@Injectable()
export class AppService {
  private readonly filesMetadata: FileMetadata[] = [];

  saveFileMetadata(file: Express.Multer.File): FileMetadata {
    const metadata: FileMetadata = {
      originalName: file.originalname,
      savedName: file.filename,
      size: file.size,
      mimeType: file.mimetype,
      url: `http://localhost:3000/files/${file.filename}`, 
    };
    
    this.filesMetadata.push(metadata);
    return metadata;
  }

  getAllFiles(): FileMetadata[] {
    return this.filesMetadata;
  }
}