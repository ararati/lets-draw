import express, { Application, NextFunction } from 'express';
import bodyParser from 'body-parser';
import * as path from 'path';
import flash from 'connect-flash';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import config from '../config';
import routes from '../api';
import { getAuthPayload } from "../helpers";
import { errorHandler } from '../exceptions/ErrorHandler';

const expressLoader = (expressApp: Application) => {
  // @ts-ignore
  // expressApp.use(async (err: Error, req: Request, res: Response, next:  NextFunction) => {
  //   if (!errorHandler.isTrustedError(err)) {
  //     next(err);
  //   }
  //   await errorHandler.handleError(err);
  // });



  // @ts-ignore
  expressApp.use(async (err, req, res, next) => {
    if (!errorHandler.isTrustedError(err)) {
      next(err);
    }
    await errorHandler.handleError(err);
  });

  expressApp.use(bodyParser.json());

  expressApp.use(bodyParser.urlencoded({
    extended: false,
  }));

  expressApp.use(cookieParser());

  expressApp.use(session({
    secret: config.get('appSecret'),
    cookie: {},
    resave: false,
    saveUninitialized: true,
  }));

  expressApp.use(flash());

  expressApp.use((req, res, next) => {
    res.locals.messageSuccess = req.flash('messageSuccess');
    res.locals.messageFailure = req.flash('messageFailure');
    res.locals.validationFailure = req.flash('validationFailure');

    const authPayload = getAuthPayload(req);
    if (authPayload) {
      res.locals.isAuth = true;
      // @ts-ignore
      res.locals.authName = authPayload.name;
      // @ts-ignore
      res.locals.authId = authPayload._id;
    } else {
      res.locals.isAuth = false;
    }

    next();
  });

  expressApp.use('/', routes());

  expressApp.set('view engine', 'pug');

  expressApp.set('views', path.resolve('src', 'views'));

  expressApp.use(express.static('./public'));
};

export default expressLoader;
