import { CarModule } from './../car/car.module';
import { Module } from '@nestjs/common';
import { RentCarService } from './rent-car.service';
import { RentCarController } from './rent-car.controller';

@Module({
  imports: [CarModule],
  controllers: [RentCarController],
  providers: [RentCarService]
})
export class RentCarModule {}
