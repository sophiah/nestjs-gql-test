import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { GraphQLSchema } from 'graphql';
import { applyDecorators } from '@nestjs/common';
import { Query as GqlQuery } from '@nestjs/graphql';
import { Span } from 'nestjs-otel';

export function QueryWithMonitor(name: string) {
  const decorators : MethodDecorator[] = [
    Span(), GqlQuery(name)
  ]
  return applyDecorators(...decorators);
}

export function DaoWithMonitor() {
  const decorators = [
    Span()
  ]
  return applyDecorators(...decorators);
}



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

export function loadSchemaFromDirectory(pathPrefix: string) : GraphQLSchema{
  // load *.gql and *.graphql
  return loadSchemaSync(`${pathPrefix}/**/*.g*ql`, {
    loaders: [new GraphQLFileLoader()]
  })
}

export function loadDocumentFromDirectory(pathPrefix: string) : GraphQLSchema{
  return loadSchemaSync(`${pathPrefix}/**/*.graphql`, {
    loaders: [new GraphQLFileLoader()]
  })
}