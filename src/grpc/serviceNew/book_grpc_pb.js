// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var book_pb = require('./book_pb.js');

function serialize_GoodreadBook_BookList(arg) {
  if (!(arg instanceof book_pb.BookList)) {
    throw new Error('Expected argument of type GoodreadBook.BookList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GoodreadBook_BookList(buffer_arg) {
  return book_pb.BookList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GoodreadBook_GetBookByAuthorIdsRequest(arg) {
  if (!(arg instanceof book_pb.GetBookByAuthorIdsRequest)) {
    throw new Error('Expected argument of type GoodreadBook.GetBookByAuthorIdsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GoodreadBook_GetBookByAuthorIdsRequest(buffer_arg) {
  return book_pb.GetBookByAuthorIdsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GoodreadBook_GetBookByIdsRequest(arg) {
  if (!(arg instanceof book_pb.GetBookByIdsRequest)) {
    throw new Error('Expected argument of type GoodreadBook.GetBookByIdsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GoodreadBook_GetBookByIdsRequest(buffer_arg) {
  return book_pb.GetBookByIdsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var BookServiceService = exports.BookServiceService = {
  getBooks: {
    path: '/GoodreadBook.BookService/GetBooks',
    requestStream: false,
    responseStream: false,
    requestType: book_pb.GetBookByIdsRequest,
    responseType: book_pb.BookList,
    requestSerialize: serialize_GoodreadBook_GetBookByIdsRequest,
    requestDeserialize: deserialize_GoodreadBook_GetBookByIdsRequest,
    responseSerialize: serialize_GoodreadBook_BookList,
    responseDeserialize: deserialize_GoodreadBook_BookList,
  },
  getBooksByAuthor: {
    path: '/GoodreadBook.BookService/GetBooksByAuthor',
    requestStream: false,
    responseStream: false,
    requestType: book_pb.GetBookByAuthorIdsRequest,
    responseType: book_pb.BookList,
    requestSerialize: serialize_GoodreadBook_GetBookByAuthorIdsRequest,
    requestDeserialize: deserialize_GoodreadBook_GetBookByAuthorIdsRequest,
    responseSerialize: serialize_GoodreadBook_BookList,
    responseDeserialize: deserialize_GoodreadBook_BookList,
  },
};

exports.BookServiceClient = grpc.makeGenericClientConstructor(BookServiceService);
