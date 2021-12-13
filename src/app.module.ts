import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DataLoaderInterceptor } from './intercept/data_loader';  
import { BookstoreModule } from './graphql/bookstore/bookstore.module';
import { ImdbModule } from './graphql/imdb/imdb.module';
import { PageModule } from './pages/page.module';
import { ActiveHandlesMetric, HttpRequestDurationSeconds, OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { ConsoleMetricExporter } from '@opentelemetry/sdk-metrics-base';


@Module({
  imports: [
    PageModule,
    OpenTelemetryModule.forRoot({
      spanProcessor: new SimpleSpanProcessor(new OTLPTraceExporter()),
    }),
    // register graphql module
    GraphQLModule.forRootAsync({
      imports: [BookstoreModule, ImdbModule],
      useFactory: () => ({
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
