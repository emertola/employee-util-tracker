import { NextFunction, Request, Response } from 'express';
import { BaseResponse, IProject } from '../types';
import {
  ValidationError,
  matchedData,
  validationResult,
} from 'express-validator';
import { ProjectSchema } from '../mongoose/schemas';
import { CustomError } from '../utils/custom-error';
import { isValidObjectId } from '../utils';

const validationCheck = (req: Request, res: Response, message?: string) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).send({
      data: result.array(),
      message: message || 'Error encountered. Please try again!',
    });
  }
};

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
  validationCheck(req, res, 'Error creating the project!');

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
    const project = new ProjectSchema(data);
    const savedProject = await project.save();

    return res.status(200).send({
      data: savedProject.toObject(),
      message: 'Project successfully created!',
    });
  } catch (error) {
    return res.status(400);
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  validationCheck(req, res, 'Error updating the project!');
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      throw new CustomError('Invalid project ID', 400);
    }

    const { projectName, company } = req.body;
    const project = { projectName, company };
    const updateOptions = { new: true, runValidators: true };
    const updatedProject = await ProjectSchema.findByIdAndUpdate(
      id,
      project,
      updateOptions
    );

    if (!updatedProject) {
      throw new CustomError('Project does not exists.', 400);
    }

    return res.status(200).send({
      data: updatedProject.toObject(),
      message: 'Project successfully updated!',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (
  req: Request,
  res: Response<BaseResponse<IProject | ValidationError | string>>,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    if (!isValidObjectId(id)) {
      throw new CustomError('Invalid project ID', 400);
    }

    const project = await ProjectSchema.findByIdAndDelete(id);
    if (!project) {
      throw new CustomError('Project not found.', 404);
    }

    res.send({
      data: id,
      message: 'Project successfully deleted!',
    });
  } catch (error) {
    next(error);
  }
};
