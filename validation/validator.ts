import Joi from "joi";

const titleValidation = Joi.object({
  title: Joi.string().min(2).max(10).optional(),
});

export default titleValidation;
