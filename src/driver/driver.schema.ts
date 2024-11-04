import { Schema, Document } from 'mongoose';

export interface Driver extends Document {
  userId: string;
  isOnline: boolean;
  currentTrip?: string;
}

export const DriverSchema = new Schema({
  userId: { type: String, required: true },
  isOnline: { type: Boolean, default: false },
  currentTrip: { type: String, default: null },
});
