import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class LocationGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('locationUpdate')
  handleLocationUpdate(
    @MessageBody() data: { userId: string; lat: number; lng: number },
  ): void {
    this.server.emit('locationUpdate', data);
  }

  @SubscribeMessage('join')
  handleJoinRoom(client: Socket, roomId: string): void {
    client.join(roomId);
  }
}
