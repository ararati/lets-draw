import { randomBytes } from 'crypto';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import User, { IUser } from '../models/user';
import config from '../config';
import { Response  } from "express";
import HTTP400Error from "../exceptions/HTTP400Error";

export default class Auth {
  constructor(
    private userModel: typeof User,
  ) {
    //
  }

  public async signUp(data: IUser) {
    try {
      const salt = randomBytes(32);
      const hashedPassword = await argon2.hash(data.password, { salt });

      const userRecord = await this.userModel.create({
        name: data.name,
        password: hashedPassword,
        salt: salt.toString('hex'),
        boards: [],
      });

      const token = Auth.generateToken(userRecord);

      return { user: userRecord, token };
    } catch (e) {
      throw e;
    }
  }

  public async signIn(name:string, password:string, res: Response)
    : Promise<{ user: IUser; token: string }> {
    const userRecord = await this.userModel.findOne({ name });

    if (!userRecord) {
      throw new HTTP400Error('The entered login details are not correct');
    }

    const validPassword = await argon2.verify(userRecord.password, password);

    if (validPassword) {
      const { _id } = userRecord;
      userRecord.update({ _id }, { $set: { updatedAt: new Date() } });

      const token = Auth.generateToken(userRecord);
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');

      res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });

      return { user, token };
    }
    throw new HTTP400Error('The entered login details are not correct');
  }

  public async logout(res:Response): Promise<void> {
    res.clearCookie('jwt');
  }

  private static generateToken(user: IUser) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        _id: user._id,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.get('jwtSecret'),
    );
  }
}
