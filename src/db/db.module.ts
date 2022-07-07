import { Module } from '@nestjs/common';
import pool from './database';
import { PG_CONNECTION } from '../constants';

const dbProvider = {
    provide: PG_CONNECTION,
    useValue: pool
  }

@Module({
    providers: [dbProvider],
    exports: [dbProvider]
})
export class DbModule {}
