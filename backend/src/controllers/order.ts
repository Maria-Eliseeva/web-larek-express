import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';

export const createOrder = (req: Request, res: Response, next: NextFunction) => {
    try {
        const uuid = faker.string.uuid();

        res.status(200).json({
            id: uuid,
            total: req.body.total
        });
    } catch (error) {
        next(error);
    }
};

