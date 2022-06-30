import { Injectable } from '@nestjs/common';
import pool from 'src/configs/database';

@Injectable()
export class CarService {

  async create(createCarDto) {
    await pool.query(`INSERT INTO cars (brand, gosnumber) VALUES($1, $2)`, [createCarDto.brand, createCarDto.gosnumber]);
  }
 
  async findAll() {
    const result = await pool.query(`SELECT * FROM cars`);
    return result.rows
  }

  async findOneById(id: number) {
    const result = await pool.query(`SELECT * FROM cars WHERE id=${id}`);
    return result.rows[0]
  }
}
