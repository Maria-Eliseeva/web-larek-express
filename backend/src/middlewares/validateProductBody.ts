import { celebrate, Segments, Joi } from 'celebrate';

const productBodySchema = Joi.object({
    
    title: Joi.string()
        .min(2) 
        .max(30) 
        .required() 
        .messages({
            'string.base': 'Поле "title" должно быть строкой',
            'string.empty': 'Поле "title" должно быть заполнено',
            'any.required': 'Поле "title" должно быть заполнено',
            'string.min': 'Минимальная длина поля "title" - 2',
            'string.max': 'Максимальная длина поля "title" - 30',
        }),


    image: Joi.object({
        fileName: Joi.string().required(), 
        originalName: Joi.string().required(), 
    }).required(),

    category: Joi.string().required(),

    description: Joi.string(),

    price: Joi.number()
        .min(0) 
        .allow(null)
});

export const validateProductBody = celebrate({
    [Segments.BODY]: productBodySchema
});