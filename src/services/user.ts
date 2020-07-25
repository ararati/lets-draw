import Board, { IBoard } from '../models/board';
import User from '../models/user';

export default class UserService {
  constructor(
    private userModel: typeof User,
  ) {
    //
  }

  public async getBoardsByUserId(userId: string, boardModel: typeof Board): Promise<IBoard[]> {
    try {
      return await boardModel.find({ author: userId }).exec();
    } catch (e) {
      throw e;
    }
  }
}
