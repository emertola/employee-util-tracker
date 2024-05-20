import { Request, Response } from 'express';
import { BaseResponse, IProject } from '../types';
import {
  ValidationError,
  matchedData,
  validationResult,
} from 'express-validator';
import { ProjectSchema } from '../mongoose/schemas';

export const getProjects = async (
  req: Request,
  res: Response<BaseResponse<IProject[] | ValidationError[]>>
) => {
  try {
    const projects = await ProjectSchema.find();

    res.send({
      data: projects,
      message: 'success',
    });
  } catch (err) {
    res.status(500);
  }
};

export const createProject = async (req: Request, res: Response) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({
      data: result.array(),
      message: 'Error creating the project!',
    });
  }

  try {
    const { projectName, company } = req.body;

    const projectExisting = await ProjectSchema.findOne({ projectName });
    if (projectExisting) {
      return res.status(400).send({
        data: projectName,
        message: 'Project Name already exists!',
      });
    }

    let data: Record<string, any> = matchedData(req, {
      includeOptionals: true,
    });
    data = {
      ...data,
      projectName,
      company,
    };
    const newProject = new ProjectSchema(data);
    const savedProject = await newProject.save();

    return res.status(200).send({
      data: savedProject.toObject(),
      message: 'Project successfully created!',
    });
  } catch (error) {
    return res.status(400);
  }
};
