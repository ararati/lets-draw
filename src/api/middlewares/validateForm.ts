import { Response, Request, NextFunction } from "express";
import Joi from "@hapi/joi";
import createValidator from "../validation/createValidator";

const validateForm = (schema: Joi.Schema, property: string = 'body') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const payload = (req as any)[property];
    const validate = createValidator(schema);

    const result: Joi.ValidationResult = validate(payload);
    const { error } = result;

    if (error == null) {
      next();
    } else {
      const messages:string[] = error.details.map((el) => el.message);
      // @ts-ignore
      req.flash('validationFailure', messages);
      res.redirect('back');
    }
  };
};

export default validateForm;
