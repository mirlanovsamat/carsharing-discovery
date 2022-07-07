import { CarRepository } from './car/car.repository';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RentCarRepository } from './rent-car/rent-car.repository';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const carRentRepository = app.get(RentCarRepository)
  const carRepository = app.get(CarRepository)
  carRentRepository.createTable()
  carRepository.createTable()
}
bootstrap();
