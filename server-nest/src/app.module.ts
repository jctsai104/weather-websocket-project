import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { ExternalApiService } from './events.service';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [],
  controllers: [EventsController],
  providers: [ExternalApiService, EventsGateway],
})
export class EventsModule {}
