// package: GoodreadBook
// file: book.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class AuthorBook extends jspb.Message { 
    getAuthorId(): string;
    setAuthorId(value: string): AuthorBook;
    getRole(): string;
    setRole(value: string): AuthorBook;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthorBook.AsObject;
    static toObject(includeInstance: boolean, msg: AuthorBook): AuthorBook.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthorBook, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthorBook;
    static deserializeBinaryFromReader(message: AuthorBook, reader: jspb.BinaryReader): AuthorBook;
}

export namespace AuthorBook {
    export type AsObject = {
        authorId: string,
        role: string,
    }
}

export class Book extends jspb.Message { 
    getBookId(): string;
    setBookId(value: string): Book;
    getTitle(): string;
    setTitle(value: string): Book;
    getDescription(): string;
    setDescription(value: string): Book;
    getIsbn(): string;
    setIsbn(value: string): Book;
    getAsin(): string;
    setAsin(value: string): Book;
    getLink(): string;
    setLink(value: string): Book;
    clearAuthorsList(): void;
    getAuthorsList(): Array<AuthorBook>;
    setAuthorsList(value: Array<AuthorBook>): Book;
    addAuthors(value?: AuthorBook, index?: number): AuthorBook;
    clearSimilarBooksList(): void;
    getSimilarBooksList(): Array<string>;
    setSimilarBooksList(value: Array<string>): Book;
    addSimilarBooks(value: string, index?: number): string;
    getAverageRating(): number;
    setAverageRating(value: number): Book;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Book.AsObject;
    static toObject(includeInstance: boolean, msg: Book): Book.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Book, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Book;
    static deserializeBinaryFromReader(message: Book, reader: jspb.BinaryReader): Book;
}

export namespace Book {
    export type AsObject = {
        bookId: string,
        title: string,
        description: string,
        isbn: string,
        asin: string,
        link: string,
        authorsList: Array<AuthorBook.AsObject>,
        similarBooksList: Array<string>,
        averageRating: number,
    }
}

export class BookList extends jspb.Message { 
    clearBooksList(): void;
    getBooksList(): Array<Book>;
    setBooksList(value: Array<Book>): BookList;
    addBooks(value?: Book, index?: number): Book;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BookList.AsObject;
    static toObject(includeInstance: boolean, msg: BookList): BookList.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BookList, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BookList;
    static deserializeBinaryFromReader(message: BookList, reader: jspb.BinaryReader): BookList;
}

export namespace BookList {
    export type AsObject = {
        booksList: Array<Book.AsObject>,
    }
}

export class GetBookByIdsRequest extends jspb.Message { 
    clearBookIdsList(): void;
    getBookIdsList(): Array<string>;
    setBookIdsList(value: Array<string>): GetBookByIdsRequest;
    addBookIds(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBookByIdsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBookByIdsRequest): GetBookByIdsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBookByIdsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBookByIdsRequest;
    static deserializeBinaryFromReader(message: GetBookByIdsRequest, reader: jspb.BinaryReader): GetBookByIdsRequest;
}

export namespace GetBookByIdsRequest {
    export type AsObject = {
        bookIdsList: Array<string>,
    }
}

export class GetBookByAuthorIdsRequest extends jspb.Message { 
    clearAuthorIdsList(): void;
    getAuthorIdsList(): Array<string>;
    setAuthorIdsList(value: Array<string>): GetBookByAuthorIdsRequest;
    addAuthorIds(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBookByAuthorIdsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBookByAuthorIdsRequest): GetBookByAuthorIdsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBookByAuthorIdsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBookByAuthorIdsRequest;
    static deserializeBinaryFromReader(message: GetBookByAuthorIdsRequest, reader: jspb.BinaryReader): GetBookByAuthorIdsRequest;
}

export namespace GetBookByAuthorIdsRequest {
    export type AsObject = {
        authorIdsList: Array<string>,
    }
}
