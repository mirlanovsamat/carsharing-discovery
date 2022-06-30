import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { RentCarService } from './rent-car.service';


@Controller('rentcar')
export class RentCarController {
  constructor(private readonly rentCarService: RentCarService) {}

  @Get('check')
  async checkCar(@Query() query){
    return await this.rentCarService.checkCar(query.carid, query.start, query.finish)
  }

  @Get('getprice')
  getPrice(@Query('day') day: string){
    return this.rentCarService.calculatePrice(day)
  }

  @Get('stat')
  getStatByMonth(@Query() query){
    return this.rentCarService.getStatByMonth(query)
  }

  @Get('statall')
  getStatAll(@Query() query){
    return this.rentCarService.getStatAll(query)
  }

  @Post()
  async rentCar(@Query() query){
    return await this.rentCarService.rentCar(query)
  }
}
