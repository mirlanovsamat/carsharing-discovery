import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarDto } from './dto/create-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  async create(@Body() createCarDto: CreateCarDto) {
    return await this.carService.create(createCarDto);
  }

  @Get()
  findAll() {
    return this.carService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOneById(+id);
  }
}
