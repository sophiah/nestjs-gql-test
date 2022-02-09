import { Controller, Get, Injectable } from '@nestjs/common';
import { join } from 'path';
import { graphql, GraphQLArgs } from 'graphql';
import { loadTypedefsSync } from '@graphql-tools/load';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { AuthorResolver } from 'src/graphql/bookstore/author/author.resolver';
import { BookResolver } from 'src/graphql/bookstore/book/book.resolver';
import { AuthorService } from 'src/graphql/bookstore/author/author.service';
import { BookService } from 'src/graphql/bookstore/book/book.service';
import { request, gql, GraphQLClient } from 'graphql-request'
import { Loader } from 'src/intercept/data_loader';
import { GAuthorsLoader } from 'src/graphql/goodread/goodread.dataloader';
import DataLoader from 'dataloader';
import { GAuthor } from 'src/gql/goodread';
import { AuthorClient } from 'src/grpc/services/goodread.author.client';
import { Author, Authors } from 'src/grpc/serviceNew/author_pb';
import { Movie, QueryTitle, Title, TitleType, TvSeries } from 'src/gql/imdbDO';
import { ImdbService, MongoQuery, MongoTitleType } from 'src/graphql/imdb/imdb/imdb.service';

const testQuery = `query bookstore ($book_id: ID!, $author_id: ID!) {
  book(book_id: $book_id) {
    book_id, name, author_ids
    authors { author_id, name }
  }
  author(author_id: $author_id) {
    author_id, name, book_ids
		books {book_id, name}
  }
}`

const client = new GraphQLClient("http://localhost:8080/graphql", {
  keepalive: true,
  timeout: 600,
})

@Controller('/page')
export class PageController {
  constructor(
    private readonly authorClient: AuthorClient,
    private readonly imdbService: ImdbService) {
  }

  /*
  There is an article: https://stackoverflow.com/questions/63766387/how-to-invoke-a-query-using-graphql-tools
  It can invoke graphql, but didn't know how to mapping resolvers in this architecture
  */
  @Get("/page-test1")
  async gauthors(
    @Loader(GAuthorsLoader) authorLoader: DataLoader<string, Author>
  ): Promise<GAuthor[]> {
    return (await authorLoader.loadMany(["1077326"])).map( x => {
      const r = new GAuthor();
      const a = <Author>(x);
      r.author_id = a.getAuthorId();
      r.name = a.getName();
      r.avg_rating = a.getAverageRating();
      return r;
    });
  }

  @Get("/page-test2")
  async test2(): Promise<GAuthor[]> {
    const authors: Authors= await (this.authorClient.getAuthors(["1077326"]));
    return authors.getAuthorsList().map( x => {
      const r = new GAuthor();
      const a = <Author>(x);
      r.author_id = a.getAuthorId();
      r.name = a.getName();
      r.avg_rating = a.getAverageRating();
      return r;
    });
  }

  @Get("/imdb-query-title")
  async imdb_query(): Promise<Title[]> {
    let mongoQuery = new MongoQuery();
    const queryTitle: QueryTitle = {
      titleType: [TitleType.MOVIE, TitleType.TVSHOW],
      count: 30
    };
    mongoQuery.composeFromQueryType(queryTitle);
    const rtn: Title[] = [];
    (await this.imdbService.queryTitle(mongoQuery)).forEach(
      x => {
        if (MongoTitleType.MOVIE.indexOf(x.titleType) != -1) {
          rtn.push(Object.assign(new Movie(), x))
        }
        if (MongoTitleType.TVSHOW.indexOf(x.titleType) != -1) {
          rtn.push(Object.assign(new TvSeries(), x))
        }
      }
    )
    return rtn;
  }

  @Get("/gql-client")
  async getByApolloClient(): Promise<Object> {
    return client.request(
      testQuery, 
      {"author_id": "12345", "book_id": "56789"},
      /** header here */
    )
    // .query({
    //   query: gql(testQuery),
    //   variables: {"author_id": "12345", "book_id": "56789"}
    // })
  }

}
