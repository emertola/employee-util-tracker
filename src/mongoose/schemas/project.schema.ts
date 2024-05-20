import { Schema, model } from 'mongoose';

const Project = new Schema({
  projectName: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
});

export const ProjectSchema = model('Project', Project);
