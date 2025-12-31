import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { PaymentStatus } from "src/database/enums/payment-status.enum";
import { PaymentMethod } from "../enums/payment-method.enum";


@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order;

  @Column({ type: 'decimal' })
  amount: number;

  @Column({ enum: PaymentMethod })
  method: PaymentMethod;

  @Column({ enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @CreateDateColumn()
  createdAt: Date;
}
