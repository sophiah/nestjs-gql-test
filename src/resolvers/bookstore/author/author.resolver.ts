import { Args, Resolver, Query, Context } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import DataLoader from 'dataloader';
import { lastValueFrom, take } from 'rxjs';
import { Author, IQuery } from 'src/gql/bookstoreDO';
import { AuthorService } from './author.service';

@Resolver('Author')
export class AuthorResolver /* implements IQuery /* */ {
  constructor(private readonly authorService: AuthorService) {}

  @Query()
  async author(
    @Args('id') id: string,
    @Context('authorDataLoader') authorLoader: DataLoader<string, Author>,
  ): Promise<Author> {
    try {
      return authorLoader.load(id);
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @Query()
  async authors(): Promise<Author[]> {
    try {
      return await lastValueFrom(
        this.authorService.getAuthorList().pipe(take(1)),
      );
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }
}
