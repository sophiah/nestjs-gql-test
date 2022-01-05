
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class GAuthor {
    author_id?: Nullable<string>;
    name?: Nullable<string>;
    avg_rating?: Nullable<number>;
    books?: Nullable<GBook[]>;
}

export class GBookAuthor {
    author_id: string;
    role?: Nullable<string>;
    author?: Nullable<GAuthor>;
}

export class GBook {
    book_id: string;
    title: string;
    description?: Nullable<string>;
    isbn?: Nullable<string>;
    asin?: Nullable<string>;
    link?: Nullable<string>;
    avg_rating?: Nullable<number>;
    authors?: Nullable<Nullable<GBookAuthor>[]>;
}

export abstract class IQuery {
    abstract gauthors(author_ids?: Nullable<string[]>): Nullable<Nullable<GAuthor>[]> | Promise<Nullable<Nullable<GAuthor>[]>>;

    abstract books(book_ids?: Nullable<string[]>): Nullable<Nullable<GBook>[]> | Promise<Nullable<Nullable<GBook>[]>>;
}

type Nullable<T> = T | null;
