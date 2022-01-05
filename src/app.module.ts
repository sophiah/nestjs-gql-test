import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from './intercept/data_loader';  
import { BookstoreModule } from './graphql/bookstore/bookstore.module';
import { ImdbModule } from './graphql/imdb/imdb.module';
import { PageModule } from './pages/page.module';
import { OpenTelemetryModule } from 'nestjs-otel'
import { GoodreadModule } from './graphql/goodread/goodread.module';

const OpenTelemetryModuleConfig = OpenTelemetryModule.forRoot({
  metrics: {
    hostMetrics: false, // Includes Host Metrics
    defaultMetrics: false, // Includes Default Metrics
    apiMetrics: {
      enable: true, // Includes api metrics
      timeBuckets: [0.01, 0.025, 0.05, 0.1, 0.25, 0.3, 0.5, 0.7, 1, 1.5, 2, 3], // You can change the default time buckets
      defaultLabels: { // You can set default labels for api metrics
        custom: 'graphql'
      },
      ignoreRoutes: ['/favicon.ico'], // You can ignore specific routes (See https://docs.nestjs.com/middleware#excluding-routes for options)
      ignoreUndefinedRoutes: false, //Records metrics for all URLs, even undefined ones
    },
  },
});

@Module({
  imports: [
    PageModule,
    OpenTelemetryModuleConfig,
    // register graphql module
    GraphQLModule.forRootAsync({
      imports: [BookstoreModule, ImdbModule, GoodreadModule],
      useFactory: () => ({
        typePaths: [join(__dirname, '../gql/schema/**/*.graphql')], // schema
        playground: false, // iGraphQL UI, it will be deprecated
        debug: false,
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
