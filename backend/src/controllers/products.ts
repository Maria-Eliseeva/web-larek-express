import { Request, Response, NextFunction } from 'express';
import Product, { IProduct } from '../models/product';
import { Error as MongooseError } from 'mongoose';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

export const createProduct = (req: Request, res: Response, next: NextFunction) => {
    const product: IProduct = req.body;
    Product.create(product).then((product) => {
        res.status(200).json(product);
    }).catch((error) => {
        if (error instanceof MongooseError.ValidationError) {
            return next(new BadRequestError('Validation failed'));
        }
        if (error instanceof Error && error.message.includes('E11000')) {
            return next(new ConflictError('Товар с таким заголовком уже существует'));
        }
        next(error);
    });
};

export const getProducts = (req: Request, res: Response, next: NextFunction) => {
    Product.find({}).then((products) => {
        res.json({
            "items": products,
            "total": products.length
        })
    }).catch((err) => {
        next(err);
    });
};
