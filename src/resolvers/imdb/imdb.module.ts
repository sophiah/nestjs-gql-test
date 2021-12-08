import { Module } from '@nestjs/common';
import { EpisodeResolver, ImdbResolver, TvSeriesResolver } from './imdb/imdb.resolver';
import { ImdbService } from './imdb/imdb.service';

@Module({
  providers: [ImdbService, ImdbResolver, TvSeriesResolver, EpisodeResolver],
  exports: [ImdbResolver, ImdbService],
})
export class ImdbModule {}
