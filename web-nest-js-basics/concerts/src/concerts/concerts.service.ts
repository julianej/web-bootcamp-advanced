import { Injectable } from '@nestjs/common';
import type { Concert } from './concert.type.js';

// Makes the service available for dependency injection
// Remove @Injectable() above ConcertsService.

// Everything still works. ConcertsService has no dependencies of its own, 
// so NestJS does not need its metadata. 
// A provider with constructor parameters would get undefined for them, 
// and the first request that uses one fails. 
// Keep @Injectable() on every provider, 
// so that adding a dependency later does not break anything.

@Injectable()
export class ConcertsService {
  private readonly concerts: Concert[] = [
    {
      id: '0b8c2f1e-3d4a-4c5b-9e6f-7a8b9c0d1e2f',
      title: 'Late Night Standards',
      artist: 'Mina Okafor Quartet',
      venue: 'Jazzkeller Hamburg',
      date: new Date('2026-12-04T20:00:00Z'),
      ticketPrice: 28,
      genre: 'jazz',
    },
    {
      id: '5e6f7a8b-9c0d-4e1f-8a2b-3c4d5e6f7a8b',
      title: 'Static Bloom Tour',
      artist: 'Neon Harbor',
      venue: 'Columbiahalle Berlin',
      date: new Date('2027-01-16T19:30:00Z'),
      ticketPrice: 45,
      genre: 'electronic',
    },
  ];

  findAll(): Concert[] {
    return this.concerts;
  }
}