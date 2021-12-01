import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, Context, ResolveReference, CONTEXT, ResolveField, Parent } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { lastValueFrom, take } from 'rxjs';
import { Author, Book, IQuery } from 'src/gql/bookstoreDO';
import { AuthorService } from './author.service';

@Resolver('Author')
export class AuthorResolver /* implements IQuery /* */ {
  constructor(
    private readonly authorService: AuthorService,
    @Inject(CONTEXT) private httpContext,
    ) {}

  @Query('author')
  async author(
    @Args('author_id') id: string
  ): Promise<Author> {
    try {
      return this.httpContext['authorDataLoader'].load(id);
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @Query('authors')
  async authors(): Promise<Author[]> {
    try {
      return await lastValueFrom(
        this.authorService.getAuthorList().pipe(take(1)),
      );
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @ResolveField('books')
  books(@Parent() author: Author) {
    return this.httpContext['bookDataLoader'].load(author.book_ids);
  }

}
