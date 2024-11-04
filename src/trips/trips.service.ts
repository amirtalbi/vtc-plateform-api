import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Trip } from './trips.schema';
import { QueueService } from '../queue/queue.service';

@Injectable()
export class TripsService {
  constructor(
    @InjectModel(Trip.name) private tripModel: Model<Trip>,
    private readonly queueService: QueueService,
  ) {}

  async create(createTripDto: any): Promise<Trip> {
    const newTrip = new this.tripModel(createTripDto);
    await this.queueService.addTask({ type: 'createTrip', newTrip });
    return newTrip.save();
  }

  async findAll(): Promise<Trip[]> {
    return this.tripModel.find().exec();
  }
}
