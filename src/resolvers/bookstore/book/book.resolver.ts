import { Args, Resolver, Query, ResolveField, Parent, ResolveReference, CONTEXT } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import DataLoader from 'dataloader';
import { lastValueFrom, take } from 'rxjs';
import { Author, Book } from 'src/gql/bookstoreDO';
import { Loader } from 'src/intercept/data_loader';
import { AuthorLoader } from '../author/author.service';
import { BookLoader, BookService } from './book.service';

@Resolver('Book')
export class BookResolver /* implements IQuery /* */ {
  constructor(
    private readonly bookService: BookService,
    ) {}

  @Query('book')
  async getBook(
    @Args('book_id') id: string,
    @Loader(BookLoader) bookLoader: DataLoader<Book['book_id'], Book>
  ): Promise<Book> {
    try {
      return bookLoader.load(id);
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @Query('books')
  async getBooks(): Promise<Book[]> {
    try {
      return await lastValueFrom(
        this.bookService.getBookList().pipe(take(1)),
      );
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }


  @ResolveField('authors')
  async authorsField(
    @Parent() parent: Book,
    @Loader(AuthorLoader) authorLoader: DataLoader<Author['author_id'], Author>
  ) {
    return authorLoader.loadMany(parent.author_ids);
  }
}
