import { OnModuleInit } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { lastValueFrom, Observable, of, take } from 'rxjs';
import { Book } from 'src/gql/bookstoreDO';
import { getRandomArray, mapFromArray, newId } from 'src/utils';

export function bookDataLoader(bookService: BookService) {
  return new DataLoader<string, Book>(async function (ids: string[]) {

    const bookList: Book[] = await lastValueFrom(
      bookService.getBooks(ids).pipe(take(1)),
    );

    const _idMap = mapFromArray(
      bookList.map((x) => <Book>x),
      (x) => x.book_id,
    );
    return ids.map((id) => _idMap[id]);
  });
}

export class BookService implements OnModuleInit {
  onModuleInit() {
    console.log('[Init] Book Service')
  }

  public getBooks(ids: string[]): Observable<Book[]> {
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
