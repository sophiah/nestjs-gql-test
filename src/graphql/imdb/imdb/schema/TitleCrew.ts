import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ collection: 'title_crew' })
export default class TitleCrew {
  @Prop()
  public tconst: string;
  @Prop()
  public directors: string[];
  @Prop()
  public writers: string[];
}

export type TitleCrewDocument = TitleCrew & Document;

export const TitleCrewSchema = SchemaFactory.createForClass(TitleCrew);