import { Module } from '@nestjs/common';
import { SocketsService } from './sockets.service';
import { SocketsGateway } from './sockets.gateway';

@Module({
  providers: [SocketsGateway, SocketsService],
  exports: [SocketsService]
})  
export class SocketsModule {}
