import mongoose, { Schema, Document } from 'mongoose';

export interface IBoard {
  _id?: string;
  name: string;
  data: string;
  width: number;
  height: number;
  author: string;
}

const BoardSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true],
      unique: true,
    },
    data: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IBoard & Document>('Board', BoardSchema);
