import { Schema, model } from 'mongoose';

const User = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  displayName: Schema.Types.String,
  password: {
    type: Schema.Types.String,
    required: true,
  },
  roles: Schema.Types.Array || [],
});

export const UserSchema = model('User', User);
