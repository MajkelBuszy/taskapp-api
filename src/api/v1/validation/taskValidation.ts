import Joi from 'joi';
import { Priority } from '../enums/Priority';
import { Status } from '../enums/Status';

import { Request, Response, NextFunction } from 'express';

const schemaTaskBody = Joi.object({
    title: Joi.string().required().error(new Error('Title is required')),
    date: Joi.date().iso().required().error(new Error('Date is required')),
    description: Joi.string()
        .required()
        .error(new Error('Description is required')),
    priority: Joi.string()
        .valid(Priority.low, Priority.medium, Priority.high)
        .required()
        .error(new Error('Priority is required')),
    status: Joi.string()
        .valid(Status.todo, Status.inProgress, Status.done)
        .required()
        .error(new Error('Status is required')),
});

const taskBodyValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void | Response<{ message: string }>> => {
    try {
        const { error } = schemaTaskBody.validate(req.body);

        if (error) {
            return res.status(500).json({ message: error.message });
        }
    } catch (e) {
        return res.status(500).json({ message: 'Internal server error' });
    }

    next();
};

export { taskBodyValidation };
