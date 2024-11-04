import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Driver } from './driver.schema';

@Injectable()
export class DriverService {
  constructor(@InjectModel('Driver') private driverModel: Model<Driver>) {}

  async goOnline(userId: string): Promise<Driver> {
    return this.driverModel.findOneAndUpdate(
      { userId },
      { isOnline: true },
      { new: true, upsert: true },
    );
  }

  async goOffline(userId: string): Promise<Driver> {
    return this.driverModel.findOneAndUpdate(
      { userId },
      { isOnline: false, currentTrip: null },
      { new: true },
    );
  }

  async acceptTrip(driverId: string, tripId: string): Promise<Driver> {
    return this.driverModel.findByIdAndUpdate(
      driverId,
      { currentTrip: tripId },
      { new: true },
    );
  }

  async refuseTrip(driverId: string): Promise<Driver> {
    return this.driverModel.findByIdAndUpdate(
      driverId,
      { currentTrip: null },
      { new: true },
    );
  }

  // Ajoutez d'autres méthodes selon les besoins
}
