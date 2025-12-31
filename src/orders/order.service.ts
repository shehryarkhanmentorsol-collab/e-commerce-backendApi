import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/database/entities/order.entity';
import { OrderItem } from 'src/database/entities/order-item.entity';
import { Product } from 'src/database/entities/product.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderStatus } from 'src/database/enums/order-status.enum';
import { User } from 'src/database/entities/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,

    @InjectRepository(OrderItem)
    private orderItemRepo: Repository<OrderItem>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

    async create(user: User, dto: CreateOrderDto) {
  let total = 0;

  const orderItems: OrderItem[] = []; //  FIX

  for (const item of dto.items) {
    const product = await this.productRepo.findOne({
      where: { id: item.productId },
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    total += product.price * item.quantity;

  orderItems.push(
  this.orderItemRepo.create({
    product,
    quantity: item.quantity,
    price: product.price,
  }),
);
  }

  const order = this.orderRepo.create({
    user: user,
    status: OrderStatus.PENDING,
    totalAmount: total,
    items: orderItems,
  });

  return this.orderRepo.save(order);
    }

    async getUserOrders(userId: string){
        return this.orderRepo.find({
            where:{user: {id: userId}},

            relations:['items', 'items.product'],

            order:{createdAt: 'DESC'}
        })
    }

}
