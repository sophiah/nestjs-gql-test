// package: GoodreadBook
// file: book.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as book_pb from "./book_pb";

interface IBookServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getBooks: IBookServiceService_IGetBooks;
    getBooksByAuthor: IBookServiceService_IGetBooksByAuthor;
}

interface IBookServiceService_IGetBooks extends grpc.MethodDefinition<book_pb.GetBookByIdsRequest, book_pb.BookList> {
    path: "/GoodreadBook.BookService/GetBooks";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<book_pb.GetBookByIdsRequest>;
    requestDeserialize: grpc.deserialize<book_pb.GetBookByIdsRequest>;
    responseSerialize: grpc.serialize<book_pb.BookList>;
    responseDeserialize: grpc.deserialize<book_pb.BookList>;
}
interface IBookServiceService_IGetBooksByAuthor extends grpc.MethodDefinition<book_pb.GetBookByAuthorIdsRequest, book_pb.BookList> {
    path: "/GoodreadBook.BookService/GetBooksByAuthor";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<book_pb.GetBookByAuthorIdsRequest>;
    requestDeserialize: grpc.deserialize<book_pb.GetBookByAuthorIdsRequest>;
    responseSerialize: grpc.serialize<book_pb.BookList>;
    responseDeserialize: grpc.deserialize<book_pb.BookList>;
}

export const BookServiceService: IBookServiceService;

export interface IBookServiceServer extends grpc.UntypedServiceImplementation {
    getBooks: grpc.handleUnaryCall<book_pb.GetBookByIdsRequest, book_pb.BookList>;
    getBooksByAuthor: grpc.handleUnaryCall<book_pb.GetBookByAuthorIdsRequest, book_pb.BookList>;
}

export interface IBookServiceClient {
    getBooks(request: book_pb.GetBookByIdsRequest, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    getBooks(request: book_pb.GetBookByIdsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    getBooks(request: book_pb.GetBookByIdsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    getBooksByAuthor(request: book_pb.GetBookByAuthorIdsRequest, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    getBooksByAuthor(request: book_pb.GetBookByAuthorIdsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    getBooksByAuthor(request: book_pb.GetBookByAuthorIdsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
}

export class BookServiceClient extends grpc.Client implements IBookServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getBooks(request: book_pb.GetBookByIdsRequest, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    public getBooks(request: book_pb.GetBookByIdsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    public getBooks(request: book_pb.GetBookByIdsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    public getBooksByAuthor(request: book_pb.GetBookByAuthorIdsRequest, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    public getBooksByAuthor(request: book_pb.GetBookByAuthorIdsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
    public getBooksByAuthor(request: book_pb.GetBookByAuthorIdsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: book_pb.BookList) => void): grpc.ClientUnaryCall;
}
