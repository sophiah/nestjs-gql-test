import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./src/gql/schema/bookstore/*.graphql'],
  path: './src/gql/bookstoreDO.ts',
  outputAs: 'class',
  federation: true,
});

definitionsFactory.generate({
  typePaths: ['./src/gql/schema/imdb/*.graphql'],
  path: './src/gql/imdbDO.ts',
  outputAs: 'class',
  federation: true,
});

definitionsFactory.generate({
  typePaths: ['./src/gql/schema/goodread/*.graphql'],
  path: './src/gql/goodread.ts',
  outputAs: 'class',
  federation: true,
});