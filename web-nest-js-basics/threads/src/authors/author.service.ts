
import { Injectable } from '@nestjs/common';
import type { Author } from './author.type.js';

@Injectable()
export class AuthorService {
  private readonly authors: Author[] = [
    { author: 'neonbyte', threads: 2 },
    { author: 'pixelpirate', threads: 2 },
    { author: 'nullpointer', threads: 1 },
  ];

//  constructor(
//   private readonly threadsService: ThreadsService,
// ) {}

  findAll(): Author[] {
    return this.authors;
  }
}