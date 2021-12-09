import { Module, Provider } from '@nestjs/common';
import { EpisodeResolver, ImdbResolver, TvSeriesResolver } from './imdb/imdb.resolver';
import { ImdbService } from './imdb/imdb.service';

export const imdbResolvers: Provider[] = [ImdbResolver, TvSeriesResolver, EpisodeResolver]
export const imdbServices: Provider[] = [ImdbService]
@Module({
  providers: imdbServices.concat(imdbResolvers),
  exports: imdbServices,
})
export class ImdbModule {}

