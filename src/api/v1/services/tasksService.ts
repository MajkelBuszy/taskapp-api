import { db } from '../../../index';
import { Task } from '../models/tasksEntity';
import { instanceToPlain } from 'class-transformer';

export class TasksService {
    constructor(private taskRepository = db.getRepository(Task)) {}

    public async findAllTasks(): Promise<Task[]> {
        let allTasks: Task[];

        try {
            allTasks = await this.taskRepository.find({
                order: {
                    date: 'ASC',
                },
            });

            allTasks = instanceToPlain(allTasks) as Task[];

            return allTasks;
        } catch (e) {
            console.log(e);
        }
    }
}
