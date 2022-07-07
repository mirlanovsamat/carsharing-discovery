import { StatDto } from './dto/stat.dto';
import { RentDto } from './dto/rent.dto';
import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RentCarService } from './rent-car.service';
import utils from './utils';


@Controller('rentcar')
export class RentCarController {
  constructor(private readonly rentCarService: RentCarService) {}

  @Post()
  async rentCar(@Body() rentDto: RentDto){
    return await this.rentCarService.rentCar(rentDto)
  }

  @Get('check')
  async checkCar(@Body() rentDto: RentDto){
    return await this.rentCarService.checkCar(rentDto)
  }

  @Get('getprice')
  getPrice(@Query('day') day: string){
    return utils.calculatePrice(day)
  }

  @Get('stat')
  getStatByMonth(@Body() statDto: StatDto){
    return this.rentCarService.getStatByMonth(statDto)
  }

  @Get('statall')
  getStatAll(@Body() statDto: StatDto){
    return this.rentCarService.getStatAll(statDto)
  }
}
