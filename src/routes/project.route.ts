import { Router } from 'express';
import { createProject, getProjects, updateProject } from '../handlers';
import { checkSchema } from 'express-validator';
import { projectSchema } from '../utils/validations';

const router = Router();

router.get('/', getProjects);
router.post('/create', checkSchema(projectSchema), createProject);
router.put('/update/:id', checkSchema(projectSchema), updateProject);

export default router;
