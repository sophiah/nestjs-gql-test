import { GraphQLDefinitionsFactory } from '@nestjs/graphql';

const definitionsFactory = new GraphQLDefinitionsFactory();

definitionsFactory.generate({
  typePaths: ['./src/gql/schema/bookstore/*.graphql'],
  path: './src/gql/bookstoreDO.ts',
  outputAs: 'class',
  federation: true,
});