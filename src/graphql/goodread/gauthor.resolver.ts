import { Inject } from '@nestjs/common';
import { Args, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import * as DataLoader from 'dataloader';
import { QueryWithMonitor } from 'src/utils';
import { GAuthor, GBook, GBookAuthor } from 'src/gql/goodread';
import { Loader } from 'src/intercept/data_loader';
import { GAuthorBooksLoader, GAuthorsLoader} from './goodread.dataloader';
import { Book } from 'src/grpc/typings/book';
import { Author } from 'src/grpc/serviceNew/author_pb';

@Resolver('GAuthor')
export class GAuthorResolver {
  constructor() {}

  @QueryWithMonitor('gauthors')
  async gauthors(
    @Args('author_ids') author_ids: string[],
    @Loader(GAuthorsLoader) authorLoader: DataLoader<string, Author>
  ): Promise<GAuthor[]> {
    try {
      return (await authorLoader.loadMany(author_ids)).map( x => {
        const r = new GAuthor();
        const a = <Author>(x);
        r.author_id = a.getAuthorId();
        r.name = a.getName();
        r.avg_rating = a.getAverageRating();
        return r;
      });
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

  @ResolveField('books')
  async books(
    @Parent() author: GAuthor,
    @Loader(GAuthorBooksLoader) bookLoader: DataLoader<string, Book[]>
  ) {
    return (await bookLoader.load(author.author_id)).map(
      b => <GBook>{
        book_id: b.bookId,
        title: b.title,
        description: b.description,
        asin: b.asin,
        isbn: b.isbn,
        avg_rating: b.averageRating,
        link: b.link
      }
    );
  }

}
