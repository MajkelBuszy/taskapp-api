import { Request, Response } from 'express';
import { tasksService } from '../services/tasksService';
import crypto from 'crypto';

const getAllTasks = async (req: Request, res: Response) => {
    try {
        const allTasks = await tasksService.findAllTasks();

        return res.status(200).json(allTasks);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const postTask = async (req: Request, res: Response) => {
    try {
        const newTask = await tasksService.createTask({
            title: req.body.title,
            date: new Date(req.body.date).toISOString(),
            description: req.body.description,
            priority: req.body.priority,
            status: req.body.status,
            id: crypto.randomUUID(),
        });

        return res.status(201).json(newTask);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

const patchTask = async (req: Request, res: Response) => {
    try {
        const task = await tasksService.findTaskById(req.body.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.status = req.body.status;

        await tasksService.updateTask(task);

        return res.status(200).json({ message: 'Task updated' });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { getAllTasks, postTask, patchTask };
