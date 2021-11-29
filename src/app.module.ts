import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';
import { join } from 'path';
import { BookstoreModule } from './resolvers/bookstore/bookstore.module';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { BookService } from './resolvers/bookstore/book/book.service';
import { AuthorService } from './resolvers/bookstore/author/author.service';
import { bookDataLoader } from './resolvers/bookstore/book/book.dataLoader';
import { authorDataLoader } from './resolvers/bookstore/author/author.dataLoader';
@Module({
  imports: [
    // register graphql module
    GraphQLFederationModule.forRootAsync({
      imports: [BookstoreModule],
      useFactory: (bookService: BookService, authorService: AuthorService) => ({
        // for data loader
        typePaths: [join(__dirname, '../gql/schema/**/*.graphql')], // schema
        playground: false, // iGraphQL UI, it will be deprecated
        debug: false,
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
