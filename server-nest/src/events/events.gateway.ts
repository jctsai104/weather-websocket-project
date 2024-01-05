/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ExternalApiService } from '../events.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private intervals: Map<string, NodeJS.Timer> = new Map(); // 用於存儲每個客戶端的定時器
  constructor(private externalApiService: ExternalApiService) {}

  @SubscribeMessage('requestData')
  async handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const clientId = client.id;
    const weather_data = await this.externalApiService.fetchData();
    // Logger.log(weather_data);
    client.emit('requestData', weather_data);

    // 如果該客戶端已經有一個定時器，則不再創建新的
    if (!this.intervals.has(clientId)) {
      const intervalId = setInterval(async () => {
        const weather_data = await this.externalApiService.fetchData();
        client.emit('requestData', weather_data); // 只發送給請求的客戶端
      }, 600000);

      this.intervals.set(clientId, intervalId);
    }
  }

  @SubscribeMessage('connection')
  handleConnection(client: Socket, ...args: any[]) {
    console.log('connected!');
  }

  @SubscribeMessage('disconnection')
  handleDisconnect(client: any) {
    console.log('disconnected...');
    // 斷開連接時清除定時器
    if (this.intervals.has(client.id)) {
      clearInterval(this.intervals.get(client.id) as any);
      this.intervals.delete(client.id);
    }
  }
}
