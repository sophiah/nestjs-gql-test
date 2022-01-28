import { lastValueFrom } from 'rxjs';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as IBook from '../typings/book';
import { DaoWithMonitor } from 'src/utils';

@Injectable()
export class BookClient implements OnModuleInit {
  private bookClient: IBook.BookServiceClient;

  constructor (@Inject(IBook.GOODREAD_BOOK_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit () {
    this.bookClient = this.client.getService<IBook.BookServiceClient>(
      IBook.BOOK_SERVICE_NAME
    );
  }

  @DaoWithMonitor()
  public async getBooks(book_ids: string[]): Promise<IBook.BookList> {
    try {
      const req = {} as IBook.GetBookByIdsRequest;
      req.bookIds = book_ids;
      return lastValueFrom(this.bookClient.getBooks(req))

    } catch (e) {
      throw new RpcException(e);
    }
  }

  @DaoWithMonitor()
  public async getBooksByAuthorIds(author_ids: string[]): Promise<IBook.BookList> {
    try {
      const req = {} as IBook.GetBookByAuthorIdsRequest;
      req.authorIds = author_ids;
      return lastValueFrom(this.bookClient.getBooksByAuthor(req))

    } catch (e) {
      throw new RpcException(e);
    }
  }
}