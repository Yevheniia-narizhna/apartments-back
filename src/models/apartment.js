import { model, Schema } from 'mongoose';

const apartmentSchema = new Schema({
  title: { type: String, required: true, maxlength: 90 },
  description: { type: String, required: true, maxlength: 335 },
  price: { type: Number, required: true },
  rooms: { type: Number, enum: [1, 2, 3], required: true },
  images: [String],
});

export const Apartment = model('Apartment', apartmentSchema, 'apartments');
