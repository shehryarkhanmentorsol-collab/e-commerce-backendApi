import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './database/data-source';
import { UserModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentsModule } from './payment/payments.module';
import { ReviewsModule } from './review/review.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
   AuthModule,
    UserModule,
    CategoriesModule,
    ProductsModule,
    OrdersModule,
    PaymentsModule,
    ReviewsModule
  ],
})
export class AppModule {}
