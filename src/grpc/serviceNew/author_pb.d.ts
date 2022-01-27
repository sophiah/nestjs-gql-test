// package: GoodreadAuthor
// file: author.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Author extends jspb.Message { 
    getAuthorId(): string;
    setAuthorId(value: string): Author;
    getName(): string;
    setName(value: string): Author;
    getAverageRating(): number;
    setAverageRating(value: number): Author;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Author.AsObject;
    static toObject(includeInstance: boolean, msg: Author): Author.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Author, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Author;
    static deserializeBinaryFromReader(message: Author, reader: jspb.BinaryReader): Author;
}

export namespace Author {
    export type AsObject = {
        authorId: string,
        name: string,
        averageRating: number,
    }
}

export class Authors extends jspb.Message { 
    clearAuthorsList(): void;
    getAuthorsList(): Array<Author>;
    setAuthorsList(value: Array<Author>): Authors;
    addAuthors(value?: Author, index?: number): Author;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Authors.AsObject;
    static toObject(includeInstance: boolean, msg: Authors): Authors.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Authors, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Authors;
    static deserializeBinaryFromReader(message: Authors, reader: jspb.BinaryReader): Authors;
}

export namespace Authors {
    export type AsObject = {
        authorsList: Array<Author.AsObject>,
    }
}

export class GetAuthorByIdsRequest extends jspb.Message { 
    clearAuthorIdsList(): void;
    getAuthorIdsList(): Array<string>;
    setAuthorIdsList(value: Array<string>): GetAuthorByIdsRequest;
    addAuthorIds(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAuthorByIdsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAuthorByIdsRequest): GetAuthorByIdsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAuthorByIdsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAuthorByIdsRequest;
    static deserializeBinaryFromReader(message: GetAuthorByIdsRequest, reader: jspb.BinaryReader): GetAuthorByIdsRequest;
}

export namespace GetAuthorByIdsRequest {
    export type AsObject = {
        authorIdsList: Array<string>,
    }
}
