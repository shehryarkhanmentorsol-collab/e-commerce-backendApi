import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Order } from "src/database/entities/order.entity";
import { Payment } from "src/database/entities/payment.entity";
import { PaymentsController } from "./payments.controller";
import { PaymentsService } from "./payments.services";


@Module({
  imports: [
    TypeOrmModule.forFeature([Payment, Order]),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService],
})
export class PaymentsModule {}


