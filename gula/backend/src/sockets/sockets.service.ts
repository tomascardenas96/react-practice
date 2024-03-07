// sockets/sockets.service.ts
import { Injectable } from '@nestjs/common';
import { SocketsGateway } from './sockets.gateway'; // Importa el gateway de sockets

@Injectable()
export class SocketsService {
  constructor(private readonly socketsGateway: SocketsGateway) {}

  // Método para emitir un evento 'nuevaPublicacion'
  async emitirEventoNuevaPublicacion(payload: any) {
    this.socketsGateway.handleNuevaPublicacion(payload);
  }

  // Otros métodos para manejar eventos WebSocket...
}
