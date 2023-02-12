import { Category } from "../interfaces/category.interface";

export class CreateProductDto {
  readonly product_id: number;
  readonly name: string;
  readonly price: string;
  readonly sku: string;
  readonly product_to_category: Category[];
}
