/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { AppService } from '../app.service';
import { ExternalApiService } from '../events.service';

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  private intervals: Map<string, NodeJS.Timer> = new Map(); // 用於存儲每個客戶端的定時器
  // constructor(private appService: AppService) {} // 注入 AppService
  constructor(private externalApiService: ExternalApiService) {}

  @SubscribeMessage('requestData')
  async handleMessage(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    const clientId = client.id;
    // const msg = this.appService.getHello();
    const weather_data = await this.externalApiService.fetchData();

    // 清除該客戶端之前的定時器
    if (this.intervals.has(clientId)) {
      clearInterval(this.intervals.get(clientId) as any);
      this.intervals.delete(clientId);
    }

    // 為該客戶端創建一個新的定時器
    const intervalId = setInterval(() => {
      this.server.emit('requestData', weather_data);
    }, 3000);

    this.intervals.set(clientId, intervalId);
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
