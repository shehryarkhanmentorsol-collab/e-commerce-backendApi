import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { OrderStatus } from "../enums/order-status.enum";
import { OrderItem } from "./order-item.entity";
import { Payment } from "./payment.entity";

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column('decimal')
  totalAmount: number;

  // ❌ REMOVE this if present
  // @Column()
  // userId: string;

  @ManyToOne(() => User, user => user.orders, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];

  @CreateDateColumn()
  createdAt: Date;
}
