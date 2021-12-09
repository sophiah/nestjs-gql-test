import { Module } from '@nestjs/common';
import { AuthorResolver } from './author/author.resolver';
import { AuthorLoader, AuthorService } from './author/author.service';
import { BookResolver } from './book/book.resolver';
import { BookLoader, BookService } from './book/book.service';

@Module({
  providers: [
    BookService, BookResolver, BookLoader,
    AuthorService, AuthorResolver, AuthorLoader,
  ],
  exports: [BookService, AuthorService],
})
export class BookstoreModule {}
