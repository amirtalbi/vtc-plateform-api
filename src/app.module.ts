import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TripsModule } from './trips/trips.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from './payment/payment.module';
import { LocationModule } from './location/location.module';
import { QueueModule } from './queue/queue.module';
import { DriverModule } from './driver/driver.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URI),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    AuthModule,
    UserModule,
    TripsModule,
    PaymentModule,
    LocationModule,
    QueueModule,
    DriverModule,
  ],
})
export class AppModule {}
