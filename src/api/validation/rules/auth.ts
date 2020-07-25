import Joi from '@hapi/joi';

export default {
  signup: Joi.object({
    name: Joi.string().min(3).max(18).required(),
    password: Joi.string().min(6).max(32).required(),
    repeat_password: Joi.ref('password'),
  }).with('password', 'repeat_password'),

  login: Joi.object({
    name: Joi.string().required().max(18),
    password: Joi.string().required().min(6).max(32),

  })
};
