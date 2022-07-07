import { DbModule } from './../db/db.module';
import { CarModule } from './../car/car.module';
import { Module } from '@nestjs/common';
import { RentCarService } from './rent-car.service';
import { RentCarController } from './rent-car.controller';
import { RentCarRepository } from './rent-car.repository';

@Module({
  imports: [CarModule, DbModule],
  controllers: [RentCarController],
  providers: [RentCarService, RentCarRepository]
})
export class RentCarModule {}
