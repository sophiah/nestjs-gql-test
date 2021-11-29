import * as DataLoader from 'dataloader';
import { lastValueFrom, take } from 'rxjs';
import { Book } from 'src/gql/bookstoreDO';
import { mapFromArray } from 'src/utils';
import { BookService } from './book.service';

export function bookDataLoader(bookService: BookService) {
  return new DataLoader<string, Book>(async function (ids: string[]) {

    const bookList: Book[] = await lastValueFrom(
      bookService.getBooks(ids).pipe(take(1)),
    );

    const _idMap = mapFromArray(
      bookList.map((x) => <Book>x),
      (x) => x.id,
    );
    return ids.map((id) => _idMap[id]);
  });
}
