import express from 'express';
import { getAllTasks, postTask } from '../controllers/tasksController';

const router = express.Router();

router.get('/', getAllTasks);

router.post('/', postTask);

export default router;
