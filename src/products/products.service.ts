import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = this.productModel.create(createProductDto);
    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    if (id) {
      const filter = { product_id: id };
      const update = { ...updateProductDto };
     
      const updatedProduct = await this.productModel.findOneAndUpdate(filter, update, {
        new: true
      });
      return updatedProduct;
    }

    throw Error('ID necessário');
  }
}
