import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('/getProductsFromExternalApi')
  async getProductsFromExternalAPi(): Promise<Product[]> {
    return this.productsService.getProductsFromExternalAPi();
  }

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
