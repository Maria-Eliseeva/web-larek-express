import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

export const validateOrderBusiness = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { items, total } = req.body;

        const products = await Product.find({ _id: { $in: items } });

        if (products.length !== items.length) {
            const foundIds = products.map(p => p._id.toString());
            const missingIds = items.filter((id: string) => !foundIds.includes(id.toString()));

            return next(new BadRequestError(`Товар с id ${missingIds[0]} не найден`));
        }

        const productWithNullPrice = products.find(p => p.price === null);
        if (productWithNullPrice) {
            return next(new BadRequestError(`Товара "${productWithNullPrice.title}" нет в наличии`));
        }

        const totalPrice = products.reduce((sum, p) => sum + (p.price ?? 0), 0);
        if (totalPrice !== total) {
            return next(new BadRequestError('Некорректная сумма заказа'));
        }

        next();
    } catch (error) {
        next(error);
    }
};