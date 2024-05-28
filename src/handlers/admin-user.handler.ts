import { Request, Response } from 'express';
import {
  ValidationError,
  matchedData,
  validationResult,
} from 'express-validator';
import { BaseResponse, UserInterface } from '../types';
import { hashPassword } from '../utils';
import { UserSchema } from '../mongoose/schemas';

export const createAdminUser = async (
  request: Request,
  response: Response<BaseResponse<UserInterface | ValidationError[]>>
) => {
  const result = validationResult(request);

  if (!result.isEmpty()) {
    return response.status(400).send({
      data: result.array(),
      message: 'Error creating the user!',
    });
  }

  const data: Record<string, any> = matchedData(request, {
    includeOptionals: true,
  });
  data.password = hashPassword(data.password);
  data.active = true;

  if (!data.firstName) {
    data.firstName = '';
  }
  if (!data.middleName) {
    data.middleName = '';
  }
  if (!data.lastName) {
    data.lastName = '';
  }
  if (!data.utilizations) {
    data.utilizations = [];
  }
  if (!data.roles) {
    data.roles = [];
  }

  const newUser = new UserSchema(data);

  try {
    const savedUser = await newUser.save();
    return response.status(201).send({
      data: savedUser.toObject(),
      message: 'User successfully created!',
    });
  } catch (error) {
    return response.sendStatus(400);
  }
};
