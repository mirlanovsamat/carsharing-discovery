import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import utils from './utils';
import { RentCarRepository } from './rent-car.repository';
import { StatDto } from './dto/stat.dto';
import { RentDto } from './dto/rent.dto';
import { CarService } from './../car/car.service';

@Injectable()
export class RentCarService {
  constructor(
    private readonly carService: CarService,
    private readonly rentCarRepository: RentCarRepository
  ){}

  async checkCar(rentDto: RentDto){
    const rents = await this.rentCarRepository.findRentByCarID(rentDto.carid)
    rents.rows.forEach(e => {
      const rentstart = moment(e.start).subtract(3, 'days').format()
      const rentfinish = moment(e.finish).add(3, 'days').format()
      if(rentfinish < moment(rentDto.start).format() || rentstart > moment(rentDto.finish).format()){
        return true
      }else {
        throw new HttpException('Машина недоступна', HttpStatus.BAD_REQUEST)
      }
    }) 
    return 'Машина доступна'
  }

  async rentCar(rentDto: RentDto){
    await this.checkCar(rentDto)
    const startOfRent = moment(rentDto.start);
    const endOfRent = moment(rentDto.finish);
    const duration = moment.duration(endOfRent.diff(startOfRent));
    const rentdays = duration.asDays() + 1;
    const price = utils.calculatePrice(rentdays)
    utils.weekendCheck(moment(rentDto.start).format('dddd'))
    utils.weekendCheck(moment(rentDto.finish).format('dddd'))
    const rent = {carid: rentDto.carid, start: rentDto.start, finish: rentDto.finish, rentdays, price}
    await this.rentCarRepository.createRent(rent)
    return `Вы арендовали машину за ${price} сомов` 
  } 

  async getStatByMonth(statDto: StatDto){
    const rents = await this.rentCarRepository.findRentByCarID(statDto.carid);
    let stat = utils.filter(rents.rows, statDto.month)
    stat = (100*stat)/utils.daysInMonth(statDto.month, statDto.year)
    const car = await this.carService.findOneById(statDto.carid)
    const month = new Date(statDto.month).toLocaleString('default', { month: 'long' })
    return `Статистика машины под госномером ${car.gosnumber} за ${month} составила ${stat}%`
  }

  async getStatAll(statDto: StatDto){
    const rents = await this.rentCarRepository.findAll()
    let stat = utils.filter(rents.rows, statDto.month)
    stat = (100*stat)/utils.daysInMonth(statDto.month, statDto.year)
    const month = new Date(statDto.month).toLocaleString('default', { month: 'long' })
    return `Статистика всех машин за ${month} составила ${stat}%`
  }

}
