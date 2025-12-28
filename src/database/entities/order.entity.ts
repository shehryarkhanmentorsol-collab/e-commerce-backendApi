import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderItem } from "./order-item.entity";
import { Payment } from "./payment.entity";


@Entity('orders')
export class Order{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(()=> User, user=> user.orders)
    user: User;

    @Column({type: 'enum', enum: OrderStatus})
    status: OrderStatus

    @Column('decimal')
    totalAmount: number;

    @OneToMany(()=> OrderItem, item=> item.order)
    items: OrderItem[];

    @OneToOne(()=> Payment, payment=> payment.order)
    payment: Payment;

    @CreateDateColumn()
    createdAt: Date;
}