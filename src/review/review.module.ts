import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/database/entities/order.entity";
import { Review } from "src/database/entities/review.entity";
import { ReviewsController } from "./review.controller";
import { ReviewsService } from "./review.service";
import { Product } from "src/database/entities/product.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([Review, Order, Product]),
  ],
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
