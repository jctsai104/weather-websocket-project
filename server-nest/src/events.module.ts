import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsGateway } from './events/events.gateway';
import { ExternalApiService } from './events.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [EventsController],
  providers: [ExternalApiService, EventsGateway],
})
export class EventsModule {}
