import { Request, Response, Router } from 'express';
import { checkSchema } from 'express-validator';
import passport from 'passport';
import { createAdminUserSchema } from '../utils/validations';
import { createAdminUser } from '../handlers/admin-user.handler';

const router = Router();

router.post(
  '/auth/admin/login',
  passport.authenticate('local'),
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

router.post(
  '/auth/admin/register',
  checkSchema(createAdminUserSchema),
  createAdminUser
);

router.get('/auth/status', (req: Request, res: Response) => {
  return req?.user ? res.send(req.user) : res.sendStatus(401);
});

export default router;
