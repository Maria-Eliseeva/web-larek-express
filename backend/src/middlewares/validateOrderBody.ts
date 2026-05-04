import { celebrate, Segments } from 'celebrate';
import Joi from "joi";

type TOrderMethod = 'card' | 'online';

export interface IOrder {
    payment: TOrderMethod,
    email: string,
    phone: string,
    address: string,
    total: number,
    items: string[]
}

export const orderSchema = Joi.object<IOrder>({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().positive().required(),
    items: Joi.array().items(Joi.string().hex().length(24)).min(1).required()
})

export const validateOrderBody = celebrate({
  [Segments.BODY]: orderSchema,
});
