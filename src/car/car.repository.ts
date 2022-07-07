import { Car } from './entities/car.entity';
import { PG_CONNECTION } from './../constants';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CarRepository {

    constructor(@Inject(PG_CONNECTION) private pool: any){}
    
    async create(car: Car) {
        const query = `INSERT INTO cars (brand, gosnumber) VALUES($1, $2) RETURNING *`;
        const carr = await this.pool.query(query, [car.brand, car.gosnumber]);
        return carr.rows[0]
    }
     
    async findAll() {
        const result = await this.pool.query(`SELECT * FROM cars`);
        return result.rows
    }
    
    async findOneById(id: number) {
        const result = await this.pool.query(`SELECT * FROM cars WHERE id=($1)`, [id]);
        return result.rows[0]
    }

    async createTable() {
        await this.pool.query(
            `CREATE TABLE IF NOT EXISTS "cars" (
                "id" serial, 
                "brand" VARCHAR(100) NOT NULL,
                "gosnumber" VARCHAR(100) NOT NULL,
                PRIMARY KEY ("id") 
            );` 
        )
    }
    
}