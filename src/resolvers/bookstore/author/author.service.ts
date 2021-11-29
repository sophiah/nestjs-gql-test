import { OnModuleInit } from '@nestjs/common';
import { Context, Parent, ResolveField } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Observable, of } from 'rxjs';
import { Author, Book } from 'src/gql/bookstoreDO';
import { getRandomArray, newId } from 'src/utils';

export class AuthorService implements OnModuleInit {
  onModuleInit() {
    console.log('[Init] Author Service')
  }

  public getAuthors(ids: string[]): Observable<Author[]> {
    return of(ids.map( a => <Author>{
      id: a,
      name: 'Author Name - ' + newId(7),
      book_ids: getRandomArray('bk', Math.floor(Math.random() * 3), 7),
    }));
  }

  public getAuthorList(): Observable<Author[]> {
    return this.getAuthors(
      getRandomArray('au', Math.floor(Math.random() * 15), 7)
    );
  }

  @ResolveField()
  public async bookList(
    @Parent() parent: Author,
    /** Add Context */
    @Context('bookDataLoader') bookLoader: DataLoader<string, Book>,
  ) {
    return bookLoader.loadMany(parent.book_ids);
  }

}
