import { Request, Response } from 'express';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const errorHandler = (err: Error, _req: Request, res: Response) => {
  if (err instanceof BadRequestError
    || err instanceof ConflictError
    || err instanceof NotFoundError) {
    res.status(err.statusCode).json({ message: err.message });
  }
  res.status(500).json({ message: 'Внутренняя ошибка сервера' });
};

export default errorHandler;
