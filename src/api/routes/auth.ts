import { Request, Response, Router } from 'express';
import authSchema from '../validation/rules/auth';
import {
  loginController,
  loginHandler,
  signupController,
  signupHandler,
  logoutHandler,
} from '../controllers/auth';
import middlewares from "../middlewares";

const router = Router();

export default (app: Router): void => {
  app.use('/auth', router);

  router.get('/signup', (req: Request, res:Response) => {
    return signupController(req, res);
  });

  router.get('/login', (req: Request, res:Response) => {
    return loginController(req, res);
  });

  router.post('/signup', middlewares.validateForm(authSchema.signup),
    (req: Request, res:Response) => {
      return signupHandler(req, res);
    });

  router.post('/login', middlewares.validateForm(authSchema.login),
    (req: Request, res:Response) => {
      return loginHandler(req, res);
    });

  router.post('/logout', middlewares.isAuth,
    (req: Request, res:Response) => {
      return logoutHandler(req, res);
    });
};
