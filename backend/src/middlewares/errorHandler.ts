import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if ( err instanceof BadRequestError || err instanceof ConflictError || err instanceof NotFoundError ) {
        return res.status(err.statusCode).json({ message: err.message });
    }

    res.status(500).json({ message: 'Внутренняя ошибка сервера' });
};