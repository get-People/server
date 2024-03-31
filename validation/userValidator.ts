import Joi from 'joi';

export const createUserValidator = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(15).max(30).email().required(),
    password: Joi.alternatives().try(Joi.string().min(4), Joi.number()).required(),
    isAdmin: Joi.boolean().required()
})

export const updateUserValidator = Joi.object({
    firstName: Joi.string().min(3).max(30).optional(),
    lastName: Joi.string().min(3).max(30).optional(),
    email: Joi.string().min(15).max(30).email().optional(),
    password: Joi.alternatives().try(Joi.string().min(4), Joi.number()).optional(),
    isAdmin: Joi.boolean().optional()
})