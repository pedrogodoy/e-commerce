import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { productsProviders } from './products.providers';
import { DatabaseModule } from '../database/database.module';
import { categoriesProviders } from './categories.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductsController],
  providers: [ProductsService, ...productsProviders, ...categoriesProviders],
})
export class ProductsModule {}
