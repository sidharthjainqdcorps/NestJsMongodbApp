//2. after connecting mongodb in app.module Module decorator , create schemas.


import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
  id: Number,
  brand: String,
  color: String,
  model: String,
});

// @Prop decorator can also be used in defining schema - check official nestjs documentation
