import { Router } from 'express';
import rentRouter from './rent.js';

const router = Router();

router.use('/api', rentRouter);

export default router;
