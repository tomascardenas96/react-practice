// sockets/sockets.service.ts
import { Injectable } from '@nestjs/common';
import { SocketsGateway } from './sockets.gateway'; // Importa el gateway de sockets

@Injectable()
export class SocketsService {
  constructor(private readonly socketsGateway: SocketsGateway) {}

  async emitirEventoNuevaPublicacion(payload: any) {
    this.socketsGateway.handleNuevaPublicacion(payload);
  }

  async emitNewPostFood(payload: any) {
    this.socketsGateway.handleNewPostFood(payload);
  }
}
