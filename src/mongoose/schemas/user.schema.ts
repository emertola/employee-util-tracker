import { Schema, model } from 'mongoose';

const User = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  firstName: {
    type: Schema.Types.String,
  },
  middleName: Schema.Types.String,
  lastName: {
    type: Schema.Types.String,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  roles: Schema.Types.Array || [],
  utilizations: Schema.Types.Array || [],
  active: {
    type: Schema.Types.Boolean,
    required: true,
  },
});

export const UserSchema = model('User', User);
