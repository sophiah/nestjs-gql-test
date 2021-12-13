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
import { Counter } from '@metinseylan/nestjs-opentelemetry';

const testQuery = `
query bookstore ($book_id: ID!, $author_id: ID!) {
  book(book_id: $book_id) {
    book_id, name, author_ids
    authors { author_id, name }
  }
  author(author_id: $author_id) {
    author_id, name, book_ids
		books {book_id, name}
  }
}
`

const IMDB_QUERY = `
query imdb {
  queryTitle(query: {
    count: 10,
    titleType: [TVSHOW, MOVIE]
  }) {
    ...titleInfo
  }
}
`

const FRAGEMENTS = `fragment titleInfo on Title {
	tconst
  titleType
  primaryTitle
  originalTitle
  ... on TvSeries {
    episodes {
      ...episodeInfo
    }
  }
}

fragment episodeInfo on Episode {
	tconst
  seasonNumber
  episodeNumber
  episodeDetail {
      primaryTitle, originalTitle
  }
}

`

const client = new GraphQLClient("http://localhost:8080/graphql", {
  keepalive: true,
  timeout: 30000,
})

@Controller('/page')
export class PageController {

  /*
  There is an article: https://stackoverflow.com/questions/63766387/how-to-invoke-a-query-using-graphql-tools
  It can invoke graphql, but didn't know how to mapping resolvers in this architecture
  */
  @Get("/page-test1")
  async getPage1(): Promise<Object> {
    const x_typedef = loadTypedefsSync(join(__dirname, '../../gql/schema/**/*.graphql'), {
      loaders: [new GraphQLFileLoader()]
    }).map( x => x.document)

    // console.log(x_typedef)

    const schema = makeExecutableSchema({
      typeDefs: x_typedef,
      /* not sure how to map resolver.? */
      resolvers: {'Author': new AuthorResolver(new AuthorService()), 'Book': new BookResolver(new BookService())},
      resolverValidationOptions: { 
        requireResolversToMatchSchema: 'ignore'
      }
    })
    
    let args : GraphQLArgs = {
      schema: schema, 
      source: testQuery,
      variableValues: {"author_id": "12345", "book_id": "56789"}
    }
    graphql(args).then(data => {
      // null currently. need to verify
      console.log(data);
    })
    return {"test": "page1"};
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

  @Get("/gql-imdb")
  async getImdb(): Promise<Object> {
    return client.request(
      IMDB_QUERY + FRAGEMENTS, 
      // {"author_id": "12345", "book_id": "56789"},
      /** header here */
    )
    // .query({
    //   query: gql(testQuery),
    //   variables: {"author_id": "12345", "book_id": "56789"}
    // })
  }
  //

}
