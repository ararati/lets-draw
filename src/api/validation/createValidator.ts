import Joi from '@hapi/joi';

const createValidator = (schema: Joi.Schema) =>
  (payload:object) : Joi.ValidationResult => {
    return schema.validate(payload, {
      abortEarly: false,
    });
  };

export default createValidator;
