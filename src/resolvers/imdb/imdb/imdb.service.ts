import { OnModuleInit } from '@nestjs/common';
import * as DataLoader from 'dataloader';
import { Connection, Model, Schema } from 'mongoose';
import { Episode, Movie, QueryTitle, Title, TitleType, TvSeries } from 'src/gql/imdbDO';
import { Document } from 'mongoose';
import mongoose = require('mongoose');
import { TitleBasicDocument, TitleBasicSchema } from './schema/TitleBasic';
import { TitleEpisodeDocument, TitleEpisodeSchema } from './schema/TitleEpisode';
import { mapFromArray } from 'src/utils';

const IMDB_CONN_STR = process.env['IMDB_CONNSTR']
const IMDB_DBNAME = 'imdb'
const COLLECTION_TITLE_BASIC = 'title_basic'

export class MongoTitleType {
  static TVSHOW = ["tvMiniSeries","tvSeries"]
  static MOVIE = ["movie", "tvMovie"]
  static EPISODE = ["tvEpisode"]
}

export class MongoQuery {
  titleTypes: string[] = []
  count: Number
 
  compose(titleTypes: string[], count: Number) {
    this.titleTypes = titleTypes;
    this.count = count;
  }
  
  composeFromQueryType(input: QueryTitle) {
    this.count = input.count;
    this.composeTitleType(input.titleType)
  }

  composeTitleType(input_types: TitleType[]) {
    if (input_types.find( x => x == TitleType.TVSHOW)) {
      this.titleTypes = this.titleTypes.concat(MongoTitleType.TVSHOW)
    }
    if (input_types.find( x => x == TitleType.MOVIE)) {
      this.titleTypes = this.titleTypes.concat(MongoTitleType.MOVIE)
    }
  }
}

export function imdbTitleDataLoader(imdbSrv: ImdbService) {
  return new DataLoader<string, Title[]>(async function (tconsts: string[]) {

    const titleList: Episode[] = await (imdbSrv.queryByTitleIds(tconsts))
    const _idMap = {}
    titleList.forEach( o => {_idMap[o.tconst] = o })
    return tconsts.map((id) => _idMap[id]);
  });
}

export function imdbEpisodeDataLoader(imdbSrv: ImdbService) {
  return new DataLoader<string, Episode[]>(async function (parentTconsts: string[]) {

    const episodeList: Episode[] = await (imdbSrv.queryEpisode(parentTconsts))
    const _idMap = {}
    episodeList.forEach( o => {
      (_idMap[o.parentTconst])
        ? _idMap[o.parentTconst].push(o)
        : _idMap[o.parentTconst] = [o]
    })
    return parentTconsts.map((id) => _idMap[id]);
  });
}

export class ImdbService implements OnModuleInit {
  onModuleInit() {
    console.log('[Init] IMDB Service')
  }

  constructor(
    private readonly mongoseConn: Connection = mongoose.createConnection(IMDB_CONN_STR)
  ) {}

  private titleBasicModel = null
  private async getTitleBasicModel (): Promise<Model<TitleBasicDocument>> {
    if (!this.titleBasicModel) {
      this.titleBasicModel = await this.getModel<TitleBasicDocument>('title_basic', TitleBasicSchema);
    }
    return this.titleBasicModel;
  }

  private titleEpisodeModel = null
  private async getTitleEpisodeModel (): Promise<Model<TitleEpisodeDocument>> {
    if (!this.titleEpisodeModel) {
      this.titleEpisodeModel = await this.getModel<TitleEpisodeDocument>('title_episode', TitleEpisodeSchema);
    }
    return this.titleEpisodeModel;
  }

  private async getModel<T extends Document> (name: string, schema: Schema<T>): Promise<Model<T>> {
    const conn: Connection = await this.mongoseConn;
    return conn.model(name, schema);
  }

  public async queryTitle(query: MongoQuery): Promise<Title[]> {
    return this.getTitleBasicModel().then(model => model.aggregate(
      [
        { $match: {titleType: {$in: query.titleTypes}}}, 
        { $sample: {size: query.count.valueOf()} }
      ]));
  }

  public async queryEpisode(parentTitleIds: string[]): Promise<Episode[]> {
    return (await this.getTitleEpisodeModel()).find(
      { parentTconst: {$in: parentTitleIds} }
    )
  }

  public async queryByTitleIds(titleIds: string[]): Promise<Title[]> {
    return (await this.getTitleBasicModel()).find(
      { tconst: {$in: titleIds} }
    )
  }

}
