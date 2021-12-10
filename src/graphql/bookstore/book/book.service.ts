import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { lastValueFrom, Observable, of, take} from 'rxjs';
import { Book } from 'src/gql/bookstoreDO';
import { NestDataLoader } from 'src/intercept/data_loader';
import { getRandomArray, mapFromArray, newId } from 'src/utils';

export class BookService {

  public getBooks(ids: readonly string[]): Observable<Book[]> {
    return of(ids.map( a => <Book>{
      book_id: a,
      name: 'Book Name - ' + newId(5),
      author_ids: getRandomArray('au', Math.floor(Math.random() * 3) + 1, 7),
    }));
  }

  public getBookList(): Observable<Book[]> {
    return this.getBooks(
      getRandomArray('bk', Math.floor(Math.random() * 15), 7)
    );
  }

}

@Injectable({ scope: Scope.REQUEST})
export class BookLoader implements NestDataLoader<string, Book> {
  constructor(private readonly bookService: BookService) {
  }

  generateDataLoader(): DataLoader<string, Book, string> {
    return new DataLoader<string, Book>(async ids => {
      const bookList: Book[] = await lastValueFrom(
        this.bookService.getBooks(ids).pipe(take(1)),
      );
  
      const _idMap = mapFromArray(
        bookList.map((x) => <Book>x),
        (x) => x.book_id,
      );
      return ids.map((id) => _idMap[id]);
    });
  }
}