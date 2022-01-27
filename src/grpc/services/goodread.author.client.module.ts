import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthorClient } from './goodread.author.client';
import { GOODREAD_AUTHOR_PACKAGE_NAME } from '../typings/author';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GOODREAD_AUTHOR_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env['AUTHOR_SERVICE'] || 'localhost:8082',
          package: [GOODREAD_AUTHOR_PACKAGE_NAME],
          protoPath: [join(__dirname, '../../../grpc/protos/author.proto')],
          keepalive: {
            keepaliveTimeMs: 300*1000,
            keepalivePermitWithoutCalls: 300*1000,
          }
        },
      },
    ]),
  ],
  providers: [AuthorClient],
  exports: [AuthorClient],
})
export class AuthorClientModule {}