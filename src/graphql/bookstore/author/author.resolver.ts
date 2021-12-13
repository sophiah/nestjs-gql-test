import { Inject } from '@nestjs/common';
import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import DataLoader from 'dataloader';
import { QueryWithMonitor } from 'src/utils';
import { Author, Book } from 'src/gql/bookstoreDO';
import { Loader } from 'src/intercept/data_loader';
import { BookLoader } from '../book/book.service';
import { AuthorLoader, AuthorService } from './author.service';

@Resolver('Author')
export class AuthorResolver  {
  constructor(
    private readonly authorService: AuthorService,
    ) {}

  @QueryWithMonitor('author')
  async author(
    @Args('author_id') id: string,
    @Loader(AuthorLoader) authorLoader: DataLoader<Author['author_id'], Author>
  ): Promise<Author> {
    try {
      return authorLoader.load(id);
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @ResolveField('books')
  async books(
    @Parent() author: Author,
    @Loader(BookLoader) bookLoader: DataLoader<Book['book_id'], Book>
  ) {
    return bookLoader.loadMany(author.book_ids);
  }

}
