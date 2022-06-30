import { rentsTable } from './../rent-car/entities/rent-car.entity';
import { carsTable } from './../car/entities/car.entity';
import { Pool } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()

const pool =  new Pool({
        host: process.env.PSQL_HOST,
        user: process.env.PSQL_USERNAME, 
        port: parseInt(process.env.PSQL_PORT),
        password: `${process.env.PSQL_PASS}`,
        database: process.env.PSQL_DATABASE,
})

pool.query(carsTable)
pool.query(rentsTable)

export default pool
