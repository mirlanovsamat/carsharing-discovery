import { CarRepository } from './car.repository';
import { DbModule } from './../db/db.module';
import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';

@Module({
  imports: [DbModule],
  controllers: [CarController],
  providers: [CarService, CarRepository],
  exports: [CarService]
})
export class CarModule {}
