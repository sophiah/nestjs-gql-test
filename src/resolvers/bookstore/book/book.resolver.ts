import { Args, Resolver, Query, Context, ResolveField, Parent } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import DataLoader from 'dataloader';
import { lastValueFrom, take } from 'rxjs';
import { Author, Book } from 'src/gql/bookstoreDO';
import { BookService } from './book.service';

@Resolver('Book')
export class BookResolver /* implements IQuery /* */ {
  constructor(private readonly bookService: BookService) {}

  @Query()
  async book(
    @Args('id') id: string,
    @Context('bookDataLoader') bookLoader: DataLoader<string, Book>,
  ): Promise<Book> {
    try {
      return bookLoader.load(id);
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @Query()
  async books(): Promise<Book[]> {
    try {
      return await lastValueFrom(
        this.bookService.getBookList().pipe(take(1)),
      );
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @ResolveField()
  async authorList(
    @Parent() parent: Book,
    /** Add Context */
    @Context('authorDataLoader') authorLoader: DataLoader<string, Author>,
  ) {
    return authorLoader.loadMany(parent.author_ids);
  }
}
