import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BookstoreModule } from './resolvers/bookstore/bookstore.module';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
// import { bookDataLoader, BookService } from './resolvers/bookstore/book/book.service';
import { ImdbModule } from './resolvers/imdb/imdb.module';
import { PageModule } from './pages/page.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from './intercept/data_loader';
@Module({
  imports: [
    PageModule,
    // register graphql module
    GraphQLModule.forRootAsync({
      imports: [BookstoreModule, ImdbModule],
      useFactory: () => ({
        // for data loader
        typePaths: [join(__dirname, '../gql/schema/**/*.graphql')], // schema
        playground: false, // iGraphQL UI, it will be deprecated
        debug: true,
        plugins: [
          ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        context: () => ({
          // additional context
        }),
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: DataLoaderInterceptor,
    }
  ],
})
export class AppModule {}
