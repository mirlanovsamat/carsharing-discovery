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

export default pool
