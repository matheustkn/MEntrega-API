import express from 'express';

import controller from '../controllers/auth';
import verifyToken from '../middlewares/verify-token';

const router = express.Router();

router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/test', verifyToken, controller.test);

export default router;
