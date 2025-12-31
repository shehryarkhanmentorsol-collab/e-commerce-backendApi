import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "src/database/entities/order.entity";
import { Payment } from "src/database/entities/payment.entity";
import { User } from "src/database/entities/user.entity";
import { Repository } from "typeorm";
import { CreatePaymentDto } from "./dto/create-payments.dto";
import { OrderStatus } from "src/database/enums/order-status.enum";
import { PaymentStatus } from "src/database/enums/payment-status.enum";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private paymentRepo: Repository<Payment>,

    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
  ) {}

  async create(user: User, dto: CreatePaymentDto) {
    const order = await this.orderRepo.findOne({
      where: { id: dto.orderId },
      relations: ['user'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

  if (!order.user || order.user.id !== user.id) {
  throw new ForbiddenException('Not your order');
}

    if (order.status === OrderStatus.PAID) {
      throw new BadRequestException('Order already paid');
    }

    const payment = this.paymentRepo.create({
      order,
      amount: order.totalAmount,
      method: dto.method,
      status: PaymentStatus.SUCCESS, // mock success for now
    });

    order.status = OrderStatus.PAID;

    await this.orderRepo.save(order);
    return this.paymentRepo.save(payment);
  }
}
