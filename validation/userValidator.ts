import Joi from 'joi';

export const createUserValidator = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(15).max(30).email().required(),
    address: Joi.object({
        country_id: Joi.string().required(),
        city_id: Joi.string().required(),
        street_id: Joi.string().required(),
    }).required()
})

export const updateUserValidator = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().min(15).max(30).email().optional()
})