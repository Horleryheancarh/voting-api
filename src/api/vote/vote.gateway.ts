import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnEvent } from '@nestjs/event-emitter';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
@Injectable()
export class VoteGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  afterInit(server: any) {
    console.log('Websocket server initialized');
  }

  handleConnection(@ConnectedSocket() client: any) {
    console.log('Client connected', client.id);
    this.server.emit('welcome', 'Welcome to the Vote updates socket');
  }

  @OnEvent('vote.new')
  sendVoteNotifications(text: string) {
    this.server.emit('vote', { text });
  }

  handleDisconnect(@ConnectedSocket() client: any) {
    console.log('Client disconnected', client.id);
  }
}
