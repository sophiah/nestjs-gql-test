// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var author_pb = require('./author_pb.js');

function serialize_GoodreadAuthor_Authors(arg) {
  if (!(arg instanceof author_pb.Authors)) {
    throw new Error('Expected argument of type GoodreadAuthor.Authors');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GoodreadAuthor_Authors(buffer_arg) {
  return author_pb.Authors.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GoodreadAuthor_GetAuthorByIdsRequest(arg) {
  if (!(arg instanceof author_pb.GetAuthorByIdsRequest)) {
    throw new Error('Expected argument of type GoodreadAuthor.GetAuthorByIdsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GoodreadAuthor_GetAuthorByIdsRequest(buffer_arg) {
  return author_pb.GetAuthorByIdsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthorServiceService = exports.AuthorServiceService = {
  getAuthors: {
    path: '/GoodreadAuthor.AuthorService/GetAuthors',
    requestStream: false,
    responseStream: false,
    requestType: author_pb.GetAuthorByIdsRequest,
    responseType: author_pb.Authors,
    requestSerialize: serialize_GoodreadAuthor_GetAuthorByIdsRequest,
    requestDeserialize: deserialize_GoodreadAuthor_GetAuthorByIdsRequest,
    responseSerialize: serialize_GoodreadAuthor_Authors,
    responseDeserialize: deserialize_GoodreadAuthor_Authors,
  },
};

exports.AuthorServiceClient = grpc.makeGenericClientConstructor(AuthorServiceService);
