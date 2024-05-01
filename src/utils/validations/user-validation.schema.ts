import { Schema } from 'express-validator';

export const createAdminUserSchema: Schema = {
  displayName: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'Display Name field must be at least 3 characters',
    },
    notEmpty: {
      errorMessage: 'Display Name field must not be empty.',
    },
  },
  username: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'Username field must be at least 3 characters',
    },
    notEmpty: {
      errorMessage: 'Username field must not be empty.',
    },
    isAlphanumeric: {
      errorMessage: 'Username must only include letters and numbers.',
    },
  },
  password: {
    isLength: {
      options: {
        min: 8,
        max: 20,
      },
      errorMessage: 'Password must be between 8 - 20 characters long.',
    },
    notEmpty: {
      errorMessage: 'Password must not be empty.',
    },
  },
  roles: {
    isArray: {
      errorMessage: 'Roles must be an array.',
    },
  },
};
