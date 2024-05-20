import { Router } from 'express';
import authRouter from './auth.route';
import projectRouter from './project.route';

const router = Router();

router.use(authRouter);
router.use(projectRouter);

export default router;
