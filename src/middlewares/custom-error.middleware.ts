import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../utils/custom-error';
import { BaseResponse } from '../types';
import { ValidationError } from 'express-validator';

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response<BaseResponse<ValidationError | string>>,
  next: NextFunction
) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(status).send({ data: `Status: ${status}`, message });
};
