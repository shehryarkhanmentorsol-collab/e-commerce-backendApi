import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/database/entities/category.entity";
import { Product } from "src/database/entities/product.entity";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.services";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Product,Category]),
    AuthModule,
  ],
  controllers:[ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
