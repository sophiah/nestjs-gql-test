import { Args, Resolver, ResolveField, Parent, ResolveReference, CONTEXT } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import * as DataLoader from 'dataloader';
import { lastValueFrom, take } from 'rxjs';
import { GBook } from 'src/gql/goodread';
import { Loader } from 'src/intercept/data_loader';
import { QueryWithMonitor } from 'src/utils';

@Resolver('GBook')
export class GBookResolver /* implements IQuery /* */ {
  constructor(
  ) {}

  @QueryWithMonitor('gbooks')
  async getBook(
    @Args('book_ids') ids: string[],
    // @Loader(BookLoader) bookLoader: DataLoader<Book['book_id'], Book>
  ): Promise<GBook> {
    try {
      return null;
      // return bookLoader.load(id);
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

}
