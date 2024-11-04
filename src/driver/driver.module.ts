import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { DriverSchema } from './driver.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Driver', schema: DriverSchema }]),
  ],
  controllers: [DriverController],
  providers: [DriverService],
})
export class DriverModule {}
