import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product, { IProduct } from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const product: IProduct = req.body;
  Product.create(product).then((newProduct) => {
    res.status(200).json(newProduct);
  }).catch((error) => {
    if (error instanceof MongooseError.ValidationError) {
      next(new BadRequestError('Validation failed'));
    } else if (error instanceof Error && error.message.includes('E11000')) {
      next(new ConflictError('Товар с таким заголовком уже существует'));
    } else {
      next(error);
    }
  });
};

export const getProducts = (_req: Request, res: Response, next: NextFunction) => {
  Product.find({}).then((products) => {
    res.json({
      items: products,
      total: products.length,
    });
  }).catch((err) => {
    next(err);
  });
};
