import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from '../middlewares';
import { createProject, getProjects } from '../handlers';

const router = Router();

router.get('/', getProjects);
router.post('/create', createProject);

export default router;
