import * as mongoose from 'mongoose';

export const CategorytSchema = new mongoose.Schema({
  category_id: Number,
  name: String,
});
