import { Document } from 'mongoose';
import { Category } from './category.interface';

export interface Product extends Document {
  readonly product_id: number;
  readonly name: string;
  readonly price: string;
  readonly sku: string;
  readonly product_to_category: Category[];
}
