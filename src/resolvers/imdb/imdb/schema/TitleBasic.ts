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
  public isAdult: Number;
  @Prop()
  public startYear: Number;
  @Prop()
  public endYear: Number;
  @Prop()
  public runtimeMinutes: String;
  @Prop()
  public genres: String[];
}

export type TitleBasicDocument = TitleBasic & Document;

export const TitleBasicSchema = SchemaFactory.createForClass(TitleBasic);