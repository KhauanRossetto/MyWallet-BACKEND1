import Joi from 'joi';

const transactionSchema = Joi.object({
  value: Joi.number().positive().required(),
  description: Joi.string().required(),
  type: Joi.string().valid('deposit', 'withdraw').required()
});

export default transactionSchema;
