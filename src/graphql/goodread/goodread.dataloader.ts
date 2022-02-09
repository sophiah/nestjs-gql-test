import { Injectable, Scope } from "@nestjs/common";
import * as DataLoader from "dataloader";
import { from, lastValueFrom } from "rxjs";
import { Author, Authors } from "src/grpc/serviceNew/author_pb";
import { AuthorClient } from "src/grpc/services/goodread.author.client";
import { BookClient } from "src/grpc/services/goodread.book.client";
import { Book, BookList } from "src/grpc/typings/book";
import { NestDataLoader } from "src/intercept/data_loader";

@Injectable({ scope: Scope.REQUEST})
export class GAuthorsLoader implements NestDataLoader<string, Author> {
  constructor(private readonly authorClient: AuthorClient) {
  }

  generateDataLoader(): DataLoader<string, Author, string> {
    return new DataLoader<string, Author>(async ids => {
      const authors: Authors= await lastValueFrom(from(this.authorClient.getAuthors(ids)));
      const _idMap = new Map(authors.getAuthorsList().map( x => [x.getAuthorId(), x]));
      return ids.map( id => _idMap.get(id));
    });
  }
}

@Injectable({ scope: Scope.REQUEST})
export class GBooksLoader implements NestDataLoader<string, Book> {
  constructor(private readonly bookClient: BookClient) {
  }

  generateDataLoader(): DataLoader<string, Book, string> {
    return new DataLoader<string, Book>(async ids => {
        const bookList: BookList = await (this.bookClient.getBooks(ids.slice(0, ids.length)));
        const _idMap = new Map(bookList.books.map( x => [x.bookId, x]));
        return ids.map( id => _idMap.get(id));
    });
  }
}

@Injectable({ scope: Scope.REQUEST})
export class GAuthorBooksLoader implements NestDataLoader<string, Book[]> {
  constructor(private readonly bookClient: BookClient) {
  }

  generateDataLoader(): DataLoader<string, Book[], string> {
    return new DataLoader<string, Book[]>(async ids => {
      const bookList: BookList = await (this.bookClient.getBooksByAuthorIds(ids.slice(0, ids.length)));
      const _idMap = new Map()
      bookList.books.forEach( b => {
        b.authors.forEach(
            a => {
                (_idMap[a.authorId])
                    ? _idMap[a.authorId].push(b)
                    : _idMap[a.authorId] = [b]
            }
        )
      });
      return ids.map( id => _idMap[id]);
    });
  }
}
