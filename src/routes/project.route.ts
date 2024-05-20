import { Request, Response, Router } from 'express';
import { ensureAuthenticated } from '../middlewares';
import { getProjects } from '../handlers';

const router = Router();

router.get('/', getProjects);

export default router;
