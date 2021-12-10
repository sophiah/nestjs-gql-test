import { Module } from '@nestjs/common';
import { AuthorResolver } from './author/author.resolver';
import { AuthorLoader, AuthorService } from './author/author.service';
import { BookResolver } from './book/book.resolver';
import { BookLoader, BookService } from './book/book.service';


export const BookstoreResolvers: any[] = [AuthorResolver, BookResolver]
export const BookstoreDataLoaders: any[] = [BookLoader, AuthorLoader]
export const BookstoreServices: any[] = [BookService, AuthorService]

@Module({
  providers: BookstoreServices.concat(BookstoreResolvers).concat(BookstoreDataLoaders),
  exports: BookstoreServices,
})
export class BookstoreModule {}
