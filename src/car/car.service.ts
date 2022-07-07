import { CarRepository } from './car.repository';
import { Injectable } from '@nestjs/common';


@Injectable()
export class CarService {

  constructor(
    private readonly carRepository: CarRepository
  ){}

  async create(createCarDto) {
    return await this.carRepository.create(createCarDto)
  }
 
  async findAll() {
    return this.carRepository.findAll()
  }

  async findOneById(id: number) {
    return this.carRepository.findOneById(id)
  }
}
