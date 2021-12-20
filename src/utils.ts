// import { loadSchemaSync } from '@graphql-tools/load';
// import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { Span, Counter } from '@metinseylan/nestjs-opentelemetry';
import { applyDecorators } from '@nestjs/common';
import { Query as GqlQuery } from '@nestjs/graphql';
import { GraphQLSchema } from 'graphql';

export function mapFromArray<T>(
  array: T[],
  keyStrategy: (v: T) => string | number,
) {
  const map: Record<string | number, T | undefined> = {};

  for (const item of array) {
    map[keyStrategy(item)] = item;
  }

  return map;
}

export function newId(length) {
  return Math.random()
      .toString(36)
      .substring(length);
}

export function getRandomArray(prefix, arrayLen, valLen) : string[] {
  var rtn : string[] = []
  for (let i = 0; i < arrayLen; i++) {
    rtn.push(prefix + '-' + newId(valLen));
  }
  return rtn
}

export function QueryWithMonitor(name: string) {
  if (process.env.enableTracing) {
    return applyDecorators(
      Span(),
      Counter(),
      GqlQuery(name)
    );
  }
  else {
    return applyDecorators(
      Counter(),
      GqlQuery(name)
    );
  }
}

export function DaoWithMonitor() {
  if (process.env.enableTracing) {
    return applyDecorators(
      Span(),
      Counter()
    );
  }
  else {
    return applyDecorators(
      Counter()
    );
  }
}

// export function loadSchemaFromDirectory(pathPrefix: string) : GraphQLSchema{
//   // load *.gql and *.graphql
//   return loadSchemaSync(`${pathPrefix}/**/*.g*ql`, {
//     loaders: [new GraphQLFileLoader()]
//   })
// }

// export function loadDocumentFromDirectory(pathPrefix: string) : GraphQLSchema{
//   return loadSchemaSync(`${pathPrefix}/**/*.graphql`, {
//     loaders: [new GraphQLFileLoader()]
//   })
// }