import mongoose, { Schema, Document } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  password: string;
  salt: string;
  boards: []
}

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true],
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    salt: String,

    boards: [{
      type: Schema.Types.ObjectId,
      ref: 'Board',
    }],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser & Document>('User', UserSchema);
