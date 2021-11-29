import { OnModuleInit } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { Book } from 'src/gql/bookstoreDO';
import { getRandomArray, newId } from 'src/utils';

export class BookService implements OnModuleInit {
  onModuleInit() {
    console.log('[Init] Book Service')
  }

  public getBooks(ids: string[]): Observable<Book[]> {
    return of(ids.map( a => <Book>{
      id: a,
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
