import { OnModuleInit } from '@nestjs/common';
import { Context, Parent, ResolveField } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { lastValueFrom, Observable, of, take } from 'rxjs';
import { Author, Book } from 'src/gql/bookstoreDO';
import { getRandomArray, mapFromArray, newId } from 'src/utils';


export function authorDataLoader(authorService: AuthorService) {
  return new DataLoader<string, Author>(async function (ids: string[]) {

    const authorList: Author[] = await lastValueFrom(
      authorService.getAuthors(ids).pipe(take(1)),
    );

    const _idMap = mapFromArray(
      authorList.map((x) => <Author>x),
      (x) => x.author_id,
    );
    return ids.map((id) => _idMap[id]);
  });
}
export class AuthorService implements OnModuleInit {
  onModuleInit() {
    console.log('[Init] Author Service')
  }

  public getAuthors(ids: string[]): Observable<Author[]> {
    return of(ids.map( a => <Author>{
      author_id: a,
      name: 'Author Name - ' + newId(7),
      book_ids: getRandomArray('bk', Math.floor(Math.random() * 3), 7),
    }));
  }

  public getAuthorList(): Observable<Author[]> {
    return this.getAuthors(
      getRandomArray('au', Math.floor(Math.random() * 15), 7)
    );
  }
}
