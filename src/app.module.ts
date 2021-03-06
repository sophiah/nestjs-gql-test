import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from './intercept/data_loader';  
import { BookstoreModule } from './graphql/bookstore/bookstore.module';
import { ImdbModule } from './graphql/imdb/imdb.module';
import { PageModule } from './pages/page.module';
import { GoodreadModule } from './graphql/goodread/goodread.module';

@Module({
  imports: [
    PageModule,
    // register graphql module
    GraphQLModule.forRootAsync({
      imports: [BookstoreModule, ImdbModule, GoodreadModule],
      useFactory: () => ({
        typePaths: [join(__dirname, '../gql/schema/**/*.graphql')], // schema
        playground: false, // iGraphQL UI, it will be deprecated
        debug: false,
        cors: false,
        // plugins: [
        //   ApolloServerPluginLandingPageGraphQLPlayground(),
        // ],
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
