import { db } from '../../../index';
import { Task } from '../models/tasksEntity';
import { instanceToPlain } from 'class-transformer';

class TasksService {
    public async findTaskById(id: string): Promise<Task | null> {
        return await db.getRepository(Task).findOne({
            where: {
                id,
            },
        });
    }

    public async findAllTasks(): Promise<Task[] | []> {
        let allTasks = await db.getRepository(Task).find({
            order: {
                date: 'ASC',
            },
        });

        allTasks = instanceToPlain(allTasks) as Task[];

        return allTasks;
    }

    public async createTask(task: Task): Promise<Task> {
        const newTask = await db.getRepository(Task).save(task);

        return newTask;
    }

    public async updateTask(task: Task): Promise<Task> {
        const updatedTask = await db.getRepository(Task).save(task);

        return updatedTask;
    }
}

export const tasksService = new TasksService();
