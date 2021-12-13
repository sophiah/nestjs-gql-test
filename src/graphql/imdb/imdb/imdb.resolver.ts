import { Observer, Span } from '@metinseylan/nestjs-opentelemetry';
import { Inject } from '@nestjs/common';
import { Args, Resolver, Query, Context, ResolveReference, CONTEXT, ResolveField, Parent, ResolveProperty } from '@nestjs/graphql';
import { UserInputError } from 'apollo-server-express';
import DataLoader from 'dataloader';
import { Episode, Movie, QueryTitle, Title, TvSeries } from 'src/gql/imdbDO';
import { Loader } from 'src/intercept/data_loader';
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

  @Span()
  @Query('queryTitle')
  async queryTitle(@Args('query') queryTitle: QueryTitle): Promise<Title[]> {
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

  @Span()
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

  @Span()
  @ResolveField('episodeDetail')
  async episodeDetail(
    @Parent() parent: Episode,
    @Loader(ImdbTitleLoader) dataLoader: DataLoader<Title['tconst'], Title>
  ) {
    return dataLoader.load(parent.tconst);
  }
}
