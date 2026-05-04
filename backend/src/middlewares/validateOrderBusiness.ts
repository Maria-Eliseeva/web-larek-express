import { Request, Response, NextFunction } from 'express';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const validateOrderBusiness = async (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const { items, total } = req.body;

    const products = await Product.find({ _id: { $in: items } });

    if (products.length !== items.length) {
      const foundIds = products.map((p) => p._id.toString());
      const missingIds = items.filter(
        (id: string) => !foundIds.includes(id.toString()),
      );

      next(new BadRequestError(`Товар с id ${missingIds[0]} не найден`));
    } else if (products.find((p) => p.price === null)) {
      const productWithNullPrice = products.find((p) => p.price === null);

      next(
        new BadRequestError(
          `Товара "${productWithNullPrice!.title}" нет в наличии`,
        ),
      );
    } else if (
      products.reduce((sum, p) => sum + (p.price ?? 0), 0) !== total
    ) {
      next(new BadRequestError('Некорректная сумма заказа'));
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

export default validateOrderBusiness;
