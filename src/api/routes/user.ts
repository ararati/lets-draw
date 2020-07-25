import {Request, Response, Router} from 'express';
import middlewares from "../middlewares";
import { settingsPage, listUsersPage, userPage } from '../controllers/user';

const router = Router();

export default (app: Router): void => {
  // app.use('/user', router);

  app.get('/settings', middlewares.isAuth, (req: Request, res: Response) => {
    return settingsPage(req, res);
  });

  app.get('/users', (req: Request, res: Response) => {
    return listUsersPage(req, res);
  });

  app.get('/user/:id', (req: Request, res: Response) => {
    return userPage(req, res);
  });
};
