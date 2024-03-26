// sockets/sockets.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway(8005, { cors: '*' })
export class SocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: any) {
    // console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: any) {
    // console.log(`Cliente desconectado: ${client.id}`);
  }

  handleNuevaPublicacion(payload: any) {
    this.server.emit('nuevaPublicacion', payload);
  }

  handleNewPostFood(payload: any) {
    this.server.emit('newFood', payload)
  }

  handleModifyFoodAmountOnCart(payload: any) {
    this.server.emit('foodAmountOnCart', payload)
  }

  handleAddFoodToCart(payload: any) {
    this.server.emit('addFoodToCart', payload)
  }
}
