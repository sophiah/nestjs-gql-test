// package: GoodreadAuthor
// file: author.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as author_pb from "./author_pb";

interface IAuthorServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getAuthors: IAuthorServiceService_IGetAuthors;
}

interface IAuthorServiceService_IGetAuthors extends grpc.MethodDefinition<author_pb.GetAuthorByIdsRequest, author_pb.Authors> {
    path: "/GoodreadAuthor.AuthorService/GetAuthors";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<author_pb.GetAuthorByIdsRequest>;
    requestDeserialize: grpc.deserialize<author_pb.GetAuthorByIdsRequest>;
    responseSerialize: grpc.serialize<author_pb.Authors>;
    responseDeserialize: grpc.deserialize<author_pb.Authors>;
}

export const AuthorServiceService: IAuthorServiceService;

export interface IAuthorServiceServer extends grpc.UntypedServiceImplementation {
    getAuthors: grpc.handleUnaryCall<author_pb.GetAuthorByIdsRequest, author_pb.Authors>;
}

export interface IAuthorServiceClient {
    getAuthors(request: author_pb.GetAuthorByIdsRequest, callback: (error: grpc.ServiceError | null, response: author_pb.Authors) => void): grpc.ClientUnaryCall;
    getAuthors(request: author_pb.GetAuthorByIdsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: author_pb.Authors) => void): grpc.ClientUnaryCall;
    getAuthors(request: author_pb.GetAuthorByIdsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: author_pb.Authors) => void): grpc.ClientUnaryCall;
}

export class AuthorServiceClient extends grpc.Client implements IAuthorServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getAuthors(request: author_pb.GetAuthorByIdsRequest, callback: (error: grpc.ServiceError | null, response: author_pb.Authors) => void): grpc.ClientUnaryCall;
    public getAuthors(request: author_pb.GetAuthorByIdsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: author_pb.Authors) => void): grpc.ClientUnaryCall;
    public getAuthors(request: author_pb.GetAuthorByIdsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: author_pb.Authors) => void): grpc.ClientUnaryCall;
}
