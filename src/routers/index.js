import { Router } from 'express';
import rentRouter from './rent.js';

const router = Router();

router.use('/rent', rentRouter);

export default router;
