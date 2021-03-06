
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Author {
    author_id?: Nullable<string>;
    name?: Nullable<string>;
    book_ids?: Nullable<string[]>;
    books?: Nullable<Book[]>;
}

export class Book {
    book_id: string;
    type: string;
    name: string;
    author_ids?: Nullable<string[]>;
    authors: Author[];
}

export abstract class IQuery {
    abstract authors(): Nullable<Author[]> | Promise<Nullable<Author[]>>;

    abstract author(author_id: string): Nullable<Author> | Promise<Nullable<Author>>;

    abstract books(): Nullable<Book[]> | Promise<Nullable<Book[]>>;

    abstract book(book_id: string): Nullable<Book> | Promise<Nullable<Book>>;
}

type Nullable<T> = T | null;
