import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'title_episode' })
export default class TitleEpisode {
  @Prop()
  public tconst: string;
  @Prop()
  public parentTconst: string;
  @Prop()
  public seasonNumber: string;
  @Prop()
  public episodeNumber: string;
}

export type TitleEpisodeDocument = TitleEpisode & Document;

export const TitleEpisodeSchema = SchemaFactory.createForClass(TitleEpisode);