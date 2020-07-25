import { Router } from 'express';
import middlewares from '../middlewares';
import { boardPage, createBoard } from '../controllers/board';
import board from '../validation/rules/board';

const router = Router();

export default (app: Router): void => {
  app.use('/board', router);

  router.get('/:id', boardPage);

  router.post('/create',
    middlewares.isAuth,
    middlewares.validateForm(board.createBoard),
    createBoard);
};
