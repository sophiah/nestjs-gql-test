import { Module } from '@nestjs/common';
import { AuthorClientModule } from 'src/grpc/services/goodread.author.client.module';
import { BookClientModule } from 'src/grpc/services/goodread.book.client.module';
import { GAuthorResolver } from './gauthor.resolver';
import { GBookResolver } from './gbook.resolver';
import { GAuthorBooksLoader, GAuthorsLoader, GBooksLoader } from './goodread.dataloader';


export const GoodreadResolvers: any[] = [GAuthorResolver, GBookResolver]
export const GoodreadDataLoaders: any[] = [GAuthorsLoader, GBooksLoader, GAuthorBooksLoader]
// export const BookstoreServices: any[] = [BookService, AuthorService]

@Module({
  imports: [BookClientModule, AuthorClientModule],
  providers: GoodreadResolvers.concat(GoodreadDataLoaders),
})
export class GoodreadModule {}
