import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, ResolveField, Parent, ResolveReference, CONTEXT } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { lastValueFrom, take } from 'rxjs';
import { Author, Book } from 'src/gql/bookstoreDO';
import { BookService } from './book.service';

@Resolver(() => Book)
export class BookResolver /* implements IQuery /* */ {
  constructor(
    private readonly bookService: BookService,
    @Inject(CONTEXT) private httpContext,
    ) {}

  @Query(() => Book, {name: 'book'})
  async getBook(
    @Args('book_id') id: string
  ): Promise<Book> {
    try {
      return this.httpContext['bookDataLoader'].load(id);
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @Query(() => [Book], {name: 'books'})
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
  ) {
    return this.httpContext['authorDataLoader'].loadMany(parent.author_ids);
  }
}
