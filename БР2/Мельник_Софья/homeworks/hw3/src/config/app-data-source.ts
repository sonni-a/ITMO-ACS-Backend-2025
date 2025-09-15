import { DataSource } from "typeorm"
import * as mysql from 'mysql2';

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "mysql",
    database: "test",
    driver: mysql,
    entities: [__dirname + '/../entities/**/*.{ts,js}'],
    logging: true,
    synchronize: true,
})