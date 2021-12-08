import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BookstoreModule } from './resolvers/bookstore/bookstore.module';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { bookDataLoader, BookService } from './resolvers/bookstore/book/book.service';
import { authorDataLoader, AuthorService } from './resolvers/bookstore/author/author.service';
import { ImdbModule } from './resolvers/imdb/imdb.module';
@Module({
  imports: [
    // register graphql module
    GraphQLModule.forRootAsync({
      imports: [BookstoreModule, ImdbModule],
      useFactory: (bookService: BookService, authorService: AuthorService) => ({
        // for data loader
        typePaths: [join(__dirname, '../gql/schema/**/*.graphql')], // schema
        playground: false, // iGraphQL UI, it will be deprecated
        debug: true,
        plugins: [
          ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: () => ({
          bookDataLoader: bookDataLoader(bookService),
          authorDataLoader: authorDataLoader(authorService),
        }),
      }),
      // for data loader
      inject: [BookService, AuthorService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
