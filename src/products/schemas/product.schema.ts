import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  product_id: Number,
  name: String,
  price: String,
  sku: String,
});
