import { Mongoose } from 'mongoose';
import { CategorytSchema } from './schemas/category.schema';
import { ProductSchema } from './schemas/product.schema';

export const categoriesProviders = [
  {
    provide: 'CATEGORY_MODEL',
    useFactory: (mongoose: Mongoose) => mongoose.model('Category', CategorytSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
