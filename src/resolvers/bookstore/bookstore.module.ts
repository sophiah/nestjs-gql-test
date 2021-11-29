import { Module } from '@nestjs/common';
import { AuthorResolver } from './author/author.resolver';
import { AuthorService } from './author/author.service';
import { BookResolver } from './book/book.resolver';
import { BookService } from './book/book.service';

@Module({
  providers: [BookService, BookResolver, AuthorService, AuthorResolver],
  exports: [BookService, AuthorService],
})
export class BookstoreModule {}
