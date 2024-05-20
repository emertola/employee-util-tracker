import { Request, Response } from 'express';
import { BaseResponse, IProject } from '../types';
import { ValidationError } from 'express-validator';
import { ProjectSchema } from '../mongoose/schemas';

export const getProjects = async (
  req: Request,
  res: Response<BaseResponse<IProject[] | ValidationError[]>>
) => {
  try {
    const projects = await ProjectSchema.find();

    if (!projects) {
    }

    res.send({
      data: projects,
      message: 'success',
    });
  } catch (err) {
    console.log('error', err);
    res.status(500);
  }
};
