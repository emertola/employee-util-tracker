import { Router } from 'express';
import authRouter from './auth.route';
import projectRouter from './project.route';
import { ensureAuthenticated } from '../middlewares';

const router = Router();

router.use(authRouter);
router.use('/projects', ensureAuthenticated, projectRouter);

export default router;
