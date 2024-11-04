import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from '../auth/auth.service';
import { TripsService } from 'src/trips/trips.service';
import { DriverService } from 'src/driver/driver.service';

@Processor('taskQueue')
@Injectable()
export class QueueProcessor {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly tripService: TripsService,
    private readonly driverService: DriverService,
  ) {}

  @Process('signup')
  async handleSignupTask(job: Job) {
    const { user } = job.data;
    console.log('Processing signup task:', user);
    await this.userService.create(user);
  }

  @Process('login')
  async handleLoginTask(job: Job) {
    const { user } = job.data;
    console.log('Processing login task:', user);
    await this.userService.updateLastLogin(user.id);
  }

  @Process('createTrip')
  async handleCreateTripTask(job: Job) {
    const { tripDetails } = job.data;
    console.log('Processing create trip task:', tripDetails);
    await this.tripService.create(tripDetails);
  }

  @Process('assignTrip')
  async handleAssignTripTask(job: Job) {
    const { driverId, tripId } = job.data;
    await this.driverService.acceptTrip(driverId, tripId);
  }
}
