import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';
import axios from 'axios';


@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>) {}

  async getProductsFromExternalAPi(): Promise<Product[]> {
    const token = await axios.post('https://api.irroba.com.br/v1/getToken', {
      username: 'integree_testedev',
      password: 'jPy2jEbSSK43jz0E7wTlqOC1tCFQNHM7puNqJ5R',
    });


    const product = await axios.get('https://api.irroba.com.br/v1/product/4569', {
      headers: { 'Authorization': `${token.data.data.authorization}` }
    });

    await this.productModel.create({
      product_id: product.data.data[0].product_id,
      name: product.data.data[0].product_description[0].name,
      price: product.data.data[0].price,
      sku: product.data.data[0].price,
    });

    return this.productModel.find().exec();
  }

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

  async delete(id: string): Promise<Product[]> {
    return this.productModel.findOneAndDelete({ product_id: id });
  }
}
