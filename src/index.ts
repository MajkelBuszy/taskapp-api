import express, { Express } from 'express';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import cors from 'cors';

import { Task } from './api/v1/models/tasksEntity';

import taskRoute from './api/v1/routes/tasksRoute';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

export const db: DataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWD,
    database: process.env.DB_NAME,
    entities: [Task],
    synchronize: false,
});

const PORT = process.env.PORT || 5000;

db.initialize()
    .then(() => {
        console.log('Database connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err: Error) => {
        console.log(err);
    });

app.use('/tasks', taskRoute);
