import { Request, Response, NextFunction } from 'express';
import { TasksService } from '../services/tasksService';

const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasksService = new TasksService();
        const allTasks = await tasksService.findAllTasks();

        return res.status(200).json(allTasks);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const postTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { getAllTasks, postTask };
