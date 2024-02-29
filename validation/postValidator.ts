import Joi from "joi";

export const createPostValidation = Joi.object({
  title: Joi.string().min(3).max(30).required(),
  body: Joi.string().min(3).max(300).required()
});

export const updatePostValidation = Joi.object({
  title: Joi.string().min(3).max(30).optional(),
  body: Joi.string().min(3).max(300).optional()
});

export const checkPostValidation = Joi.object({
  title: Joi.string().min(3).max(30).required()
});

