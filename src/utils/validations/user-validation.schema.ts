import { Schema } from 'express-validator';

export const createAdminUserSchema: Schema = {
  firstName: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'First Name field must be at least 3 characters',
    },
    optional: true,
  },
  middleName: {
    optional: true,
  },
  lastName: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'Last Name field must be at least 3 characters',
    },
    optional: true,
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
    optional: true,
  },
  utilizations: {
    isArray: {
      errorMessage: 'Utilizations must be an array.',
    },
    optional: true,
  },
  active: {
    isBoolean: true,
    optional: true,
  },
};
