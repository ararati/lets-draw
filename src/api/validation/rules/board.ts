import Joi from '@hapi/joi';

export default {
  createBoard: Joi.object({
    name: Joi.string().min(1).max(32).required(),
    width: Joi.number().min(16).max(1000).required(),
    height: Joi.number().min(16).max(1000).required(),
  }),
};
