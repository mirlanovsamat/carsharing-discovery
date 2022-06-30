import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarModule } from './car/car.module';
import { RentCarModule } from './rent-car/rent-car.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    CarModule,
    RentCarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
