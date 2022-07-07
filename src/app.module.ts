import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { RentCarModule } from './rent-car/rent-car.module';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CarModule,
    RentCarModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
