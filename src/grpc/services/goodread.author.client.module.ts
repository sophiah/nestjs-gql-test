// import { join } from 'path';
import { Module } from '@nestjs/common';
import { AuthorClient } from './goodread.author.client';

@Module({
  imports: [],
  providers: [AuthorClient],
  exports: [AuthorClient],
})
export class AuthorClientModule {}