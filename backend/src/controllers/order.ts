import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  try {
    const uuid = faker.string.uuid();

    return res.status(200).json({
      id: uuid,
      total: req.body.total,
    });
  } catch (error) {
    return next(error);
  }
};

export default createOrder;
