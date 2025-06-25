import { Apartment } from '../models/apartment';
import fs from 'fs';
import path from 'path';

export const getAllApartments = async (req, res) => {
  const { rooms, minPrice, maxPrice } = req.query;
  const filter = {};

  if (rooms) filter.rooms = rooms;
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);

  const apartments = await Apartment.find(filter);
  res.json(apartments);
};

export const createApartment = async (req, res) => {
  const { title, description, price, rooms } = req.body;

  const images = req.files.map(
    (file) =>
      `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, '/')}`,
  );

  const newApartment = await Apartment.create({
    title,
    description,
    price,
    rooms,
    images,
  });

  res.status(201).json(newApartment);
};

export const updateApartment = async (req, res) => {
  try {
    const apartmentId = req.params.id;
    const apartment = await Apartment.findById(apartmentId);

    if (!apartment) {
      return res.status(404).json({ message: 'Apartment not found' });
    }

    const remainingImages = req.body.images ? JSON.parse(req.body.images) : [];

    const removedImages = (apartment.images || []).filter(
      (img) => !remainingImages.includes(img),
    );

    removedImages.forEach((imgUrl) => {
      const imgPath = path.join(
        process.cwd(),
        'uploads',
        imgUrl.split('/uploads/')[1],
      );
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    });

    const newImageUrls = (req.files || []).map((file) => {
      return `${req.protocol}://${req.get('host')}/${file.path.replace(
        /\\/g,
        '/',
      )}`;
    });

    const updatedApartment = await Apartment.findByIdAndUpdate(
      apartmentId,
      {
        ...req.body,
        images: [...remainingImages, ...newImageUrls],
      },
      { new: true },
    );

    res.json(updatedApartment);
  } catch (error) {
    console.error('Error updating apartment:', error);
    res.status(500).json({ message: 'Failed to update apartment' });
  }
};

export const deleteApartment = async (req, res) => {
  await Apartment.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
