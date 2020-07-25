import { Request, Response } from 'express';
import User from '../../models/user';
import Board from '../../models/board';
import UserService from '../../services/user';
import HTTP404Error from "../../exceptions/HTTP404Error";

export function settingsPage(req: Request, res: Response) {
  res.render('user/settings');
}

export function listUsersPage(req: Request, res: Response) {
  User.find({}, (err, result) => {
    res.render('user/list', {
      users: result,
    });
  });
}

export async function userPage(req: Request, res: Response) {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (user === null) {
    throw new HTTP404Error('User not found');
  }
  const userService = await new UserService(User);
  userService.getBoardsByUserId(id, Board)
    .then((userBoards) => {
      res.render('user/profile', {
        user,
        userBoards,
      });
    });
}
