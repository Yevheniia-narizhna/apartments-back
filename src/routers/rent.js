import { Router } from 'express';
import {
  createApartment,
  deleteApartment,
  getAllApartments,
  getApartmentById,
  updateApartment,
} from '../controllers/apartmentController.js';
import upload from '../middlewares/upload.js';
// import express from 'express';
// import { ctrlWrapper } from '../utils/ctrlWrapper.js';
// import { validateBody } from '../middlewares/validateBody.js';

// const jsonParser = express.json();

const router = Router();

router.get('/', getAllApartments);
router.get('/:id', getApartmentById);
router.post('/', upload.array('images', 5), createApartment);
router.put('/:id', upload.array('images', 5), updateApartment);
router.delete('/:id', deleteApartment);

export default router;
