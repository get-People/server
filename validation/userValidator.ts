import Joi from 'joi';

export const createUserValidator = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(15).max(30).email().required()
})

export const updateUserValidator = Joi.object({
    name: Joi.string().min(3).max(30).optional(),
    email: Joi.string().min(15).max(30).email().optional()
})