import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from "src/database/entities/order-item.entity";
import { Order } from "src/database/entities/order.entity";
import { Product } from "src/database/entities/product.entity";
import {  Module } from "@nestjs/common";
import { OrdersService } from "./order.service";
import { OrdersController } from "./orders.controller";


@Module({
    imports:[TypeOrmModule.forFeature([Order, OrderItem, Product])],
    controllers:[OrdersController],
    providers: [OrdersService],
})

export class OrdersModule{}