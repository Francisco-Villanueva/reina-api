import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { eventProvider } from './event.provider';

@Module({
  controllers: [EventController],
  providers: [EventService, ...eventProvider],
})
export class EventModule {}
