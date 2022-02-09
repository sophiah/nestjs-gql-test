import { Module } from '@nestjs/common';
import { BookstoreResolvers, BookstoreServices } from 'src/graphql/bookstore/bookstore.module';
import { ImdbModule } from 'src/graphql/imdb/imdb.module';
import { AuthorClientModule } from 'src/grpc/services/goodread.author.client.module';
import { PageController } from './page.controller';

@Module({
    imports: [AuthorClientModule, ImdbModule],
    controllers: [PageController]
})
export class PageModule {}