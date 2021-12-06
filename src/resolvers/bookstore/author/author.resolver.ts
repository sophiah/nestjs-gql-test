import { Span } from '@metinseylan/nestjs-opentelemetry';
import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, CONTEXT, ResolveField, Parent } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import { Author } from 'src/gql/bookstoreDO';
import { AuthorService } from './author.service';

@Resolver('Author')
export class AuthorResolver /* implements IQuery /* */ {
  constructor(
    private readonly authorService: AuthorService,
    @Inject(CONTEXT) private httpContext,
    ) {}

  @Span()
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

  @ResolveField('books')
  async books(@Parent() author: Author) {
    return this.httpContext['bookDataLoader'].loadMany(author.book_ids);
  }

}
