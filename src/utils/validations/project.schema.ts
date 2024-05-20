import { Schema } from 'express-validator';

export const projectSchema: Schema = {
  projectName: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'Minimum of 3 characters.',
    },
    notEmpty: {
      errorMessage: 'Project Name must not be empty.',
    },
  },
  company: {
    isLength: {
      options: {
        min: 3,
      },
      errorMessage: 'Minimum of 3 characters.',
    },
    notEmpty: {
      errorMessage: 'Project Name must not be empty.',
    },
  },
};
