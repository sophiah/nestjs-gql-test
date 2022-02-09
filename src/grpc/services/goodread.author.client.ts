import * as grpc from '@grpc/grpc-js';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { DaoWithMonitor } from 'src/utils';
import { AuthorServiceClient } from '../serviceNew/author_grpc_pb';
import { Authors, GetAuthorByIdsRequest } from '../serviceNew/author_pb';


function getCallOptions(timeoutSecond = 60): grpc.CallOptions {
  return {
      deadline: new Date(Date.now() + timeoutSecond * 1000),
  };
}

@Injectable()
export class AuthorClient implements OnModuleInit {
  private authorClient: AuthorServiceClient;
  private metadata = new grpc.Metadata();

  constructor () {}

  onModuleInit () {
    const addr = process.env['AUTHOR_SERVICE'] || 'localhost:8082'
    this.authorClient = new AuthorServiceClient(
      addr,
      grpc.credentials.createInsecure(),
      {
        "grpc.keepalive_time_ms": 10000,
        "grpc.keepalive_timeout_ms": 5000,
        "grpc.use_local_subchannel_pool": 1,
        "grpc.default_compression_algorithm": 2,
        "grpc.default_compression_level": 2
      }
    )
  }

  @DaoWithMonitor()
  public async getAuthors(author_ids: readonly string[]): Promise<Authors> {
    // try {
      const req = new GetAuthorByIdsRequest();
      req.setAuthorIdsList(author_ids.slice(0, author_ids.length));
      return new Promise<Authors>((resolve, reject) => {
        const options = getCallOptions(3);
        this.authorClient.getAuthors(req, this.metadata, options, (err, data) => {
            if (err) {
              reject(err);
            }
            resolve(data);
        });
      });
  }
}