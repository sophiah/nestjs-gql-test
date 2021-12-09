import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'title_principals' })
export default class TitlePrincipal {
  @Prop()
  public tconst: string;
  @Prop()
  public ordering: number;
  @Prop()
  public nconst: string;
  @Prop()
  public category: string;
  @Prop()
  public job: string;
  @Prop()
  public characters: string[];
}

export type TitlePrincipalDocument = TitlePrincipal & Document;

export const TitlePrincipalSchema = SchemaFactory.createForClass(TitlePrincipal);