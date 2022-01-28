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
import { Author, Authors } from 'src/grpc/typings/author';
import { GAuthor } from 'src/gql/goodread';
import { AuthorClient } from 'src/grpc/services/goodread.author.client';

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
  constructor(private readonly authorClient: AuthorClient) {
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
      r.author_id = a.authorId;
      r.name = a.name;
      r.avg_rating = a.averageRating;
      return r;
    });
  }

  @Get("/page-test2")
  async test2(): Promise<GAuthor[]> {
    const authors: Authors= await (this.authorClient.getAuthors(["1077326"]));
    return authors.authors.map( x => {
      const r = new GAuthor();
      const a = <Author>(x);
      r.author_id = a.authorId;
      r.name = a.name;
      r.avg_rating = a.averageRating;
      return r;
    });
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
