import { Request, Response } from 'express';
import BoardService from '../../services/board';
import Board  from '../../models/board';

export function boardPage(req: Request, res: Response) {
  Board.findOne({ _id: req.params.id }, (err, board) => {
    res.render('board/index', {
      board,
    });
  });
}

export function createBoard(req: Request, res: Response) {
  const { width, height, name } = req.body;
  const service = new BoardService(Board);
  service.createBoard({
    width,
    height,
    name,
    // @ts-ignore
    author: req.token._id,
    data: ' ',
  }).then((board) => {
    res.redirect(`/board/${board._id}`);
  });
}
