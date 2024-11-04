import { Controller, Post, Body, Param } from '@nestjs/common';
import { DriverService } from './driver.service';

@Controller('drivers')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post(':userId/go-online')
  goOnline(@Param('userId') userId: string) {
    return this.driverService.goOnline(userId);
  }

  @Post(':userId/go-offline')
  goOffline(@Param('userId') userId: string) {
    return this.driverService.goOffline(userId);
  }

  @Post(':driverId/accept-trip')
  acceptTrip(
    @Param('driverId') driverId: string,
    @Body('tripId') tripId: string,
  ) {
    return this.driverService.acceptTrip(driverId, tripId);
  }

  @Post(':driverId/refuse-trip')
  refuseTrip(@Param('driverId') driverId: string) {
    return this.driverService.refuseTrip(driverId);
  }

  // Ajoutez d'autres endpoints selon les besoins
}
