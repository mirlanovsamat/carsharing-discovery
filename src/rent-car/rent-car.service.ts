import { CarService } from './../car/car.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import pool from 'src/configs/database';

@Injectable()
export class RentCarService {
  constructor(
    private readonly carService: CarService
  ){}

  async createRent(carid, start, finish, rentdays, price){
    await pool.query(`INSERT INTO rents (carid, start, finish, rentdays, price) VALUES($1, $2, $3, $4, $5)`, [carid, start, finish, rentdays, price])
  }

  async checkCar(carid, start, finish){
    const rents = await pool.query(`SELECT * FROM rents WHERE carid=${carid}`)
    rents.rows.forEach(e => {
      const rentstart = new Date(e.start)
      const rentfinish = new Date(e.finish)
      rentstart.setDate(rentstart.getDate() - 3)
      rentfinish.setDate(rentfinish.getDate() + 3)
      if(rentfinish < new Date(start) || rentstart > new Date(finish)){
        return 'Машина доступна'
      }else {
        throw new HttpException('Машина недоступна', HttpStatus.BAD_REQUEST)
      }
    }) 
  }

  async rentCar(query){
    await this.checkCar(query.carid, query.start, query.finish)
    const startOfRent = new Date(query.start);
    const endOfRent = new Date(query.finish);
    const rentdays = Math.ceil(Math.abs(endOfRent.getTime() - startOfRent.getTime()) / (1000 * 3600 * 24)) + 1;
    const price = this.calculatePrice(rentdays)
    this.weekendCheck(startOfRent.getDay())
    this.weekendCheck(endOfRent.getDay())
    await this.createRent(query.carid, startOfRent, endOfRent, rentdays, price)
    return `Вы арендовали машину за ${price} сомов`
  }

  async getStatByMonth(query){
    const rents = await pool.query(`SELECT * FROM rents WHERE carid=${query.carid}`);
    let stat = this.filter(rents.rows, query.month)
    stat = (100*stat)/this.daysInMonth(query.month, query.year)
    const car = await this.carService.findOneById(query.carid)
    const month = new Date(query.month).toLocaleString('default', { month: 'long' })
    return `Статистика машины под госномером ${car.gosnumber} за ${month} составила ${stat}%`
  }

  async getStatAll(query){
    const rents = await pool.query(`SELECT * FROM rents`)
    let stat = this.filter(rents.rows, query.month)
    stat = (100*stat)/this.daysInMonth(query.month, query.year)
    const month = new Date(query.month).toLocaleString('default', { month: 'long' })
    return `Статистика всех машин за ${month} составила ${stat}%`
  }

  filter(array, month){
    let stat = 0
    array.forEach(e => {
      const start = new Date(e.start)
      const finish = new Date(e.finish)
      if(start.getMonth() === finish.getMonth() && start.getMonth() == (month - 1)){
        stat += e.rentdays
      }
      else if(start.getMonth() == (month - 1)) {
        stat += this.daysInMonth(month, start.getFullYear()) - start.getDate() + 1
      }
      else if(finish.getMonth() == (month - 1)) {
        stat += finish.getDate()
      }
    })
    return stat
  }

  daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }

  weekendCheck(weekDay){
    if(weekDay === 0 || weekDay === 6){
      throw new HttpException('Первый и последний день не должны быть выходными', HttpStatus.BAD_REQUEST)
    } 
  }

  calculatePrice(day){
    let result = 0
    if(day <= 4){
      result = day * 1000
    }
    if(4 < day && day <= 9){
      result = (4 * 1000) + ((day-4)*950)
    }
    if(9 < day && day <= 17){
      result = (4 * 1000) + (5*950) + ((day-9)*900)
    }
    if(17 < day && day <= 30){
      result = (4 * 1000) + (5*950) + (8*900) + ((day-17)*850)
    }
    if(day > 30){
      throw new HttpException('Максимальный срок аренды 30 дней.', HttpStatus.BAD_REQUEST)
    }
    return result
  }
}
