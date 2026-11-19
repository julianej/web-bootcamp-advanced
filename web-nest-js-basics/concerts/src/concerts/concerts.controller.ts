import { Controller, Get } from '@nestjs/common';
import { ConcertsService } from './concerts.service.js';
import type { Concert } from './concert.type.js';

@Controller()
export class ConcertsController {
  constructor(
    private readonly concertsService: ConcertsService,
  ) {}

  // Method returns an array of concerts
  @Get('concerts')
  findAll(): Concert[] {
    return this.concertsService.findAll();
  }
}