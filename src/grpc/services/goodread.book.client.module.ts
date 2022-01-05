import { join } from 'path';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookClient } from './goodread.book.client';
import { GOODREAD_BOOK_PACKAGE_NAME } from '../typings/book';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: GOODREAD_BOOK_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          url: process.env['BOOK_SERVICE'] || 'localhost:8082',
          package: [GOODREAD_BOOK_PACKAGE_NAME],
          protoPath: [join(__dirname, '../../../grpc/protos/book.proto')],
        },
      },
    ]),
  ],
  providers: [BookClient],
  exports: [BookClient],
})
export class BookClientModule {}