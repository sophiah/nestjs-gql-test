import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { lastValueFrom, Observable, of, take } from 'rxjs';
import { Author } from 'src/gql/bookstoreDO';
import { NestDataLoader } from 'src/intercept/data_loader';
import { getRandomArray, mapFromArray, newId } from 'src/utils';

export class AuthorService {

  public getAuthors(ids: readonly string[]): Observable<Author[]> {
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

@Injectable({ scope: Scope.REQUEST})
export class AuthorLoader implements NestDataLoader<string, Author> {
  constructor(private readonly authorService: AuthorService) { }

  generateDataLoader(): DataLoader<string, Author, string> {
    return new DataLoader<string, Author>(async ids => {
      const authorList: Author[] = await lastValueFrom(
        this.authorService.getAuthors(ids).pipe(take(1)),
      );
  
      const _idMap = mapFromArray(
        authorList.map((x) => <Author>x),
        (x) => x.author_id,
      );
      return ids.map((id) => _idMap[id]);
    });
  }
}

