import { PG_CONNECTION } from './../constants';
import { Inject, Injectable } from '@nestjs/common';
import { RentCar } from './entities/rent-car.entity';

@Injectable()
export class RentCarRepository {
    constructor(@Inject(PG_CONNECTION) private pool: any){}

    async createRent(rent: RentCar){
        const query = `INSERT INTO rents (carid, start, finish, rentdays, price) VALUES($1, $2, $3, $4, $5) RETURNING *`
        const rentedCar = await this.pool.query(query, [rent.carid, rent.start, rent.finish, rent.rentdays, rent.price])
        return rentedCar.rows[0]
    }

    async findAll(){
        return await this.pool.query(`SELECT * FROM rents`)
    }

    async findRentByCarID(carid: number){
        return await this.pool.query(`SELECT * FROM rents WHERE carid=($1)`, [carid])
    }

    createTable(){
        return this.pool.query(
            `CREATE TABLE IF NOT EXISTS "rents" (
                "id" serial, 
                "carid" integer REFERENCES "cars",
                "start" VARCHAR(100) default 0,
                "finish" VARCHAR(100) default 0,
                "rentdays" integer default 0,
                "price" integer default 0,
                PRIMARY KEY ("id") 
            );`    
        )
    }
}