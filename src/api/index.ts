import { Router } from 'express';
import routes from './routes';

function setupRoutes(appRouter: Router) {
  Object.values(routes).forEach((route) => {
    route(appRouter);
  });
}

function indexRoutes(): Router {
  const app = Router();
  setupRoutes(app);

  return app;
}

export default indexRoutes;
