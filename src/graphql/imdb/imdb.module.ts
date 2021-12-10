import { Module, Provider } from '@nestjs/common';
import { EpisodeResolver, ImdbResolver, TvSeriesResolver } from './imdb/imdb.resolver';
import { ImdbEpisodeLoader, ImdbService, ImdbTitleLoader } from './imdb/imdb.service';

export const _resolvers: Provider[] = [ImdbResolver, TvSeriesResolver, EpisodeResolver]
export const _dataLoader: Provider[] = [ImdbEpisodeLoader, ImdbTitleLoader]
export const _services: Provider[] = [ImdbService]

@Module({
  providers: _services.concat(_resolvers).concat(_dataLoader),
  exports: _services,
})
export class ImdbModule {}

