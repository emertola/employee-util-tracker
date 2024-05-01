import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  displayName: mongoose.Schema.Types.String,
  password: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  roles: mongoose.Schema.Types.Array || [],
});

export const UserSchema = mongoose.model('User', User);
