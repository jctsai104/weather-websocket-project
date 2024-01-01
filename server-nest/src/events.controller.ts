import { Controller, Get } from '@nestjs/common';
import { ExternalApiService } from './events.service';
@Controller()
export class EventsController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @Get()
  getData() {
    return this.externalApiService.fetchData();
  }
}
