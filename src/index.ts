import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

const app: Express = express();

export const db: DataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    synchronize: true,
});

const PORT = process.env.PORT || 5000;

app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!');
});

db.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err: Error) => {
        console.log(err);
    });
