import Board, { IBoard } from '../models/board';

export default class BoardService {
  constructor(
    private boardModel: typeof Board,
  ) {
  }

  public async createBoard(data: IBoard): Promise<IBoard> {
    try {
      const boardRecord = await this.boardModel.create(data);
      const board = boardRecord.toObject();

      return board;
    } catch (e) {
      throw e;
    }
  }
}
