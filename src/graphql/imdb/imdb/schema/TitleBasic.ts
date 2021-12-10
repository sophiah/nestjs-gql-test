import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'title_basic' })
export default class TitleBasic {
  @Prop()
  public tconst: string;
  @Prop()
  public titleType: string;
  @Prop()
  public primaryTitle: string;
  @Prop()
  public originalTitle: string;
  @Prop()
  public isAdult: number;
  @Prop()
  public startYear: number;
  @Prop()
  public endYear: number;
  @Prop()
  public runtimeMinutes: string;
  @Prop()
  public genres: string[];
}

export type TitleBasicDocument = TitleBasic & Document;

export const TitleBasicSchema = SchemaFactory.createForClass(TitleBasic);