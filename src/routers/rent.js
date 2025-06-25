import { Router } from 'express';
import {
  createApartment,
  deleteApartment,
  getAllApartments,
  updateApartment,
} from '../controllers/apartmentController';
import upload from '../middlewares/upload';
// import express from 'express';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';

// const jsonParser = express.json();

const router = Router();

router.get('/', getAllApartments);
router.post('/', upload.array('images', 5), createApartment);
router.put('/:id', upload.array('images', 5), updateApartment);
router.delete('/:id', deleteApartment);

export default router;
