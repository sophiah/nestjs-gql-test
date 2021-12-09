import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'name' })
export default class Crew {
  @Prop()
  public nconst: string;
  @Prop()
  public primaryName: string;
  @Prop()
  public birthYear: string;
  @Prop()
  public primaryProfession: string[];
  @Prop()
  public knownForTitles: string[];
}

export type CrewDocument = Crew & Document;

export const CrewSchema = SchemaFactory.createForClass(Crew);