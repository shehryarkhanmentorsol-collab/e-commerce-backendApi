import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Review } from 'src/database/entities/review.entity';
import { Order } from 'src/database/entities/order.entity';
import { Product } from 'src/database/entities/product.entity';
import { OrderStatus } from 'src/database/enums/order-status.enum';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,

    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async createReview(userId: string, dto: CreateReviewDto) {
    const product = await this.productRepo.findOne({
      where: { id: dto.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const order = await this.orderRepo
      .createQueryBuilder('order')
      .innerJoin('order.items', 'item')
      .where('order.userId = :userId', { userId})
      .andWhere('item.productId = :productId', {
        productId: dto.productId,
      })
      .andWhere('order.status = :status', {
        status: OrderStatus.PAID,
      })
      .getOne();

    if (!order) {
      throw new ForbiddenException(
        'You can only review products you have purchased',
      );
    }

    const exists = await this.reviewRepo.findOne({
      where: {
      userId,
      productId: dto.productId,
    },
    });

    if (exists) {
      throw new BadRequestException('You already reviewed this product');
    }

    const review = this.reviewRepo.create({
      rating: dto.rating,
      comment: dto.comment,
      userId,
      product,
    });

    await this.reviewRepo.save(review);

    await this.updateProductRating(product.id);

    return review;
  }

  // 2. RATING CALCULATION (SEPARATE METHOD)
  private async updateProductRating(productId: string) {
    const stats = await this.reviewRepo
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avg')
      .addSelect('COUNT(review.id)', 'count')
      .where('review.productId = :productId', { productId })
      .getRawOne();

    await this.productRepo.update(productId, {
      averageRating: Number(stats.avg) || 0,
      reviewCount: Number(stats.count),
    });
  }
}
