import mongoose from "mongoose";

import { ICar } from "../interfaces/car.interface";

const { Schema } = mongoose;

const CarSchema = new Schema(
  {
    model: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false },
);

export const CarModel = mongoose.model<ICar>("cars", CarSchema);
