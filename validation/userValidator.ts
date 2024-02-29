import Joi from 'joi';

export const createUserValidator = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(15).max(30).email().required(),
    address: Joi.object({
        country_id: Joi.string().required(),
        city_id: Joi.string().required(),
        street_id: Joi.string().required(),
    }).required(),
    age: Joi.number().min(18).max(120).required(),
})

export const updateUserValidator = Joi.object({
    firstName: Joi.string().min(3).max(30).optional(),
    lastName: Joi.string().min(3).max(30).optional(),
    email: Joi.string().min(15).max(30).email().optional(),
    address: Joi.object({
        country_id: Joi.string().required(),
        city_id: Joi.string().required(),
        street_id: Joi.string().required(),
    }).optional(),
    age: Joi.number().min(18).max(120).optional(),
})