import { Module } from '@nestjs/common';
import { BookstoreResolvers, BookstoreServices } from 'src/graphql/bookstore/bookstore.module';
import { AuthorClientModule } from 'src/grpc/services/goodread.author.client.module';
import { PageController } from './page.controller';

@Module({
    imports: [AuthorClientModule],
    controllers: [PageController]
})
export class PageModule {}