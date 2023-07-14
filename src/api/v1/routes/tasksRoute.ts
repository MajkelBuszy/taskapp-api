import express from 'express';
import {
    getAllTasks,
    patchTask,
    postTask,
} from '../controllers/tasksController';

const router = express.Router();

router.get('/', getAllTasks);

router.post('/', postTask);

router.patch('/', patchTask);

export default router;
