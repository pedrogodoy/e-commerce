import { Document } from 'mongoose';

export interface Product extends Document {
  readonly product_id: number;
  readonly name: string;
  readonly price: string;
  readonly sku: string;
}
