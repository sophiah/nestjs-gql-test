import { Module } from '@nestjs/common';
import { ImdbResolver } from './imdb/imdb.resolver';
import { ImdbService } from './imdb/imdb.service';

@Module({
  providers: [ImdbResolver, ImdbService],
  exports: [ImdbResolver, ImdbService],
})
export class ImdbModule {}
