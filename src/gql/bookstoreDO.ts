
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum MutationType {
    CREATED = "CREATED",
    UPDATED = "UPDATED",
    DELETED = "DELETED"
}

export class Author {
    id: string;
    name: string;
    book_ids?: Nullable<string[]>;
    bookList?: Nullable<Book[]>;
}

export abstract class IQuery {
    abstract authors(): Author[] | Promise<Author[]>;

    abstract author(id: string): Author | Promise<Author>;

    abstract books(): Book[] | Promise<Book[]>;

    abstract book(id: string): Book | Promise<Book>;
}

export class Book {
    id: string;
    name: string;
    author_ids?: Nullable<string[]>;
    authorList?: Nullable<Author[]>;
}

type Nullable<T> = T | null;
