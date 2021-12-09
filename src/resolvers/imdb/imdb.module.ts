import { Module, Provider } from '@nestjs/common';
import { EpisodeResolver, ImdbResolver, TvSeriesResolver } from './imdb/imdb.resolver';
import { ImdbEpisodeLoader, ImdbService, ImdbTitleLoader } from './imdb/imdb.service';

export const imdbResolvers: Provider[] = [ImdbResolver, TvSeriesResolver, EpisodeResolver]
export const imdbDataLoader: Provider[] = [ImdbEpisodeLoader, ImdbTitleLoader]
export const imdbServices: Provider[] = [ImdbService]
@Module({
  providers: imdbServices.concat(imdbResolvers).concat(imdbDataLoader),
  exports: imdbServices,
})
export class ImdbModule {}

