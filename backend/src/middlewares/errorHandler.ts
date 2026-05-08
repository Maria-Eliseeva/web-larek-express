import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (
    err instanceof BadRequestError
    || err instanceof ConflictError
    || err instanceof NotFoundError
  ) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
};

export default errorHandler;
