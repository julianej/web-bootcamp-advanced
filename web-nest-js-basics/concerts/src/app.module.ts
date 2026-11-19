import { Module } from '@nestjs/common';
import { createObserveModule } from '@nestjs/observe';
import { ConcertsController } from './concerts/concerts.controller.js';
import { ConcertsService } from './concerts/concerts.service.js';

const { ObserveModule } = createObserveModule();

@Module({
  imports: [
    ObserveModule.forRoot({
      appKey: process.env.OBSERVE_APP_KEY ?? 'YOUR_APP_KEY',
      appSecret: process.env.OBSERVE_APP_SECRET ?? 'YOUR_APP_SECRET',
      serviceId: 'concerts',
    }),
  ],
  // // PROVIDERS
  // The entry under providers is what registers a class with the container.
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class AppModule {}