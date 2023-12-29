import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ExternalApiService } from './events.service';
import { Response } from 'express';

@Controller()
export class EventsController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @Get()
  async getData(@Res() response: Response): Promise<any> {
    try {
      const data = await this.externalApiService.fetchData();
      response.json().send(data);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch data',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
