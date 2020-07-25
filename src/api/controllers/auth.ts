import { Request, Response } from 'express';
import Auth from '../../services/auth';
import User from '../../models/user';

export function signupController(req: Request, res: Response) {
  res.render('auth/signup');
}

export function loginController(req: Request, res: Response) {
  res.render('auth/signin');
}

export function loginHandler(req: Request, res: Response) {
  const authService = new Auth(User);
  const { name, password } = req.body;
  authService.signIn(name, password, res).then(() => {
    res.redirect('/');
  });
}

export function signupHandler(req: Request, res: Response) {
  const authService = new Auth(User);
  authService.signUp(req.body).then(() => {
    res.redirect('/');
  });
}

export function logoutHandler(req: Request, res: Response) {
  const authService = new Auth(User);
  authService.logout(res).then(() => {
    res.redirect('/');
  });
}
