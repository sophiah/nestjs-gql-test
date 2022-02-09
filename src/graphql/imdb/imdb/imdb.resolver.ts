import { Inject, UseGuards } from '@nestjs/common';
import { Args, Resolver, Context, ResolveReference, CONTEXT, ResolveField, Parent, ResolveProperty } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import DataLoader from 'dataloader';
import { OtelMethodCounter, OtelValueRecorder } from 'nestjs-otel';
import { CurrentUser } from 'src/auth';
import { Episode, Movie, QueryTitle, Title, TvSeries } from 'src/gql/imdbDO';
import { Loader } from 'src/intercept/data_loader';
import { QueryWithMonitor } from 'src/utils';
import { ImdbEpisodeLoader, ImdbService, ImdbTitleLoader, MongoQuery, MongoTitleType } from './imdb.service';

@Resolver('Title')
export class ImdbResolver /* implements IQuery /* */ {
  constructor(
    private readonly imdbService: ImdbService,
    @Inject(CONTEXT) private httpContext,
    ) {}

  @ResolveField('__resolveType')
  __resolveType(obj) {
    if (obj instanceof TvSeries) {
      return 'TvSeries';
    }
    return 'Movie';
  }

  @QueryWithMonitor('queryTitle')
  async queryTitle(
    @Args('query') queryTitle: QueryTitle,
    @CurrentUser() user: string,
  ): Promise<Title[]> {
    try {
      let mongoQuery = new MongoQuery();
      mongoQuery.composeFromQueryType(queryTitle);
      const rtn: Title[] = [];
      (await this.imdbService.queryTitle(mongoQuery)).forEach(
        x => {
          if (MongoTitleType.MOVIE.indexOf(x.titleType) != -1) {
            rtn.push(Object.assign(new Movie(), x))
          }
          if (MongoTitleType.TVSHOW.indexOf(x.titleType) != -1) {
            rtn.push(Object.assign(new TvSeries(), x))
          }
        }
      )
      return rtn;
    } catch (err) {
      throw new UserInputError(err.message);
    }
  }

}
@Resolver('TvSeries')
export class TvSeriesResolver {
  constructor() {}

  @ResolveField('episodes')
  async episodes(
    @Parent() tvSeries: TvSeries,
    @Loader(ImdbEpisodeLoader) dataLoader: DataLoader<Episode['tconst'], Episode[]>
  ) {
    return dataLoader.load(tvSeries.tconst);
  }
}

@Resolver('Episode')
export class EpisodeResolver {
  constructor() {}

  @ResolveField('episodeDetail')
  async episodeDetail(
    @Parent() parent: Episode,
    @Loader(ImdbTitleLoader) dataLoader: DataLoader<Title['tconst'], Title>
  ) {
    return dataLoader.load(parent.tconst);
  }
}
