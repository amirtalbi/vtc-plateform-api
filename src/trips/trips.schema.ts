import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Trip extends Document {
  @Prop({ required: true })
  driverId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  pickupLocation: string;

  @Prop({ required: true })
  dropoffLocation: string;

  @Prop({ required: true })
  fare: number;

  @Prop({ default: Date.now })
  date: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip);
