import { ForbiddenException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './interfaces/product.interface';
import axios from 'axios';
import { Category } from './interfaces/category.interface';


@Injectable()
export class ProductsService {
  constructor(@Inject('PRODUCT_MODEL') private readonly productModel: Model<Product>, @Inject('CATEGORY_MODEL') private readonly categoryModel: Model<Category>) {}

  async getProductsFromExternalAPi(): Promise<Product[]> {
    const token = await axios.post('https://api.irroba.com.br/v1/getToken', {
      username: 'integree_testedev',
      password: 'jPy2jEbSSK43jz0E7wTlqOC1tCFQNHM7puNqJ5R',
    });

    const products_ids = [4569, 4559, 4552];
    for (let index = 0; index < products_ids.length; index++) {
      const product = await axios.get(`https://api.irroba.com.br/v1/product/${products_ids[index]}`, {
        headers: { 'Authorization': `${token.data.data.authorization}` }
      });


      const createdProduct = await this.productModel.create({
        product_id: product.data.data[0].product_id,
        name: product.data.data[0].product_description[0].name,
        price: product.data.data[0].price,
        sku: product.data.data[0].price,
      });
      
      const category = await this.categoryModel.create(product.data.data[0].product_to_category) as unknown as [];

      const findedProduct = await this.productModel.findOne({ product_id: createdProduct.product_id });
      if (findedProduct) {
        findedProduct.product_to_category.push(...category);
        findedProduct.save();
      }  
    }    

    return this.productModel.find().populate('product_to_category').exec();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { name, price, product_id, sku, product_to_category } = createProductDto;
    const createdProduct = await this.productModel.create({
      name,
      price,
      product_id,
      sku
    });

    if(createProductDto?.product_to_category.length > 0) {
      
      const category = await this.categoryModel.create(createProductDto.product_to_category) as unknown as [];

      const product = await this.productModel.findOne({ product_id: createdProduct.product_id });
      if (product) {
        product.product_to_category.push(...category);
        product.save();
        return product;
      }
    }

    return createdProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('product_to_category').exec();
  }

  async findOne(product_id: string): Promise<Product> {
    const product = await this.productModel.findOne({ product_id }).populate('product_to_category').exec();

    if (!product) {
      throw new NotFoundException("Produto não encontrado.");
    }

    return product;
  }

  async update(product_id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    if (product_id) {
      const filter = { product_id };
      let update = { ...updateProductDto };
      delete update?.product_to_category;

      const updatedProduct = await this.productModel.findOneAndUpdate(filter, update, {
        new: true
      });

      if(!updatedProduct) {
        throw new NotFoundException("Produto não encontrado!");
      }

      if (updateProductDto.product_to_category) {
        await this.productModel.findOneAndUpdate(filter, { product_to_category: [] }, {
          new: true
        });

        if(updateProductDto.product_to_category.length > 0) {
          const category = await this.categoryModel.create(updateProductDto.product_to_category) as unknown as [];

          const product = await this.productModel.findOne({ product_id });
          if (product) {
            product.product_to_category.push(...category);
            product.save();
            return product;
          }
        }
      }

      return updatedProduct;
    }

    throw new InternalServerErrorException("Erro interno.");
  }

  async delete(product_id: string): Promise<Product> {
    const product = await this.productModel.findOne({ product_id });
    if (!product) {
      throw new NotFoundException("Produto não encontrado!");
    }

    await this.productModel.deleteOne({ product_id });
    return product;
  }
}
