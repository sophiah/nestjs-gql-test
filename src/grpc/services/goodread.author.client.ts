import { lastValueFrom } from 'rxjs';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as IAuthor from '../typings/author';

@Injectable()
export class AuthorClient implements OnModuleInit {
  private authorClient: IAuthor.AuthorServiceClient;

  constructor (@Inject(IAuthor.GOODREAD_AUTHOR_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit () {
    this.authorClient = this.client.getService<IAuthor.AuthorServiceClient>(
      IAuthor.AUTHOR_SERVICE_NAME,
    );
  }

  public async getAuthors(author_ids: readonly string[]): Promise<IAuthor.Authors> {
    try {
      const req = {} as IAuthor.GetAuthorByIdsRequest;
      req.authorIds = author_ids.slice(0, author_ids.length);
      return lastValueFrom(this.authorClient.getAuthors(req))

    } catch (e) {
      throw new RpcException(e);
    }
  }
}