import { Request, Response, Router } from 'express';
import { homeController } from '../controllers/home';

const router = Router();

export default (app: Router): void => {
  app.use('/', router);

  router.get('/', (req: Request, res:Response) => homeController(req, res));
};
