import { Module } from '@nestjs/common';
import { BookstoreResolvers, BookstoreServices } from 'src/graphql/bookstore/bookstore.module';
import { PageController } from './page.controller';

@Module({
    controllers: [PageController]
})
export class PageModule {}