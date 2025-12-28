import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { PaymentStatus } from "src/database/enums/payment-status.enum";


@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Order, order => order.payment)
  @JoinColumn()
  order: Order;

  @Column('decimal')
  amount: number;

  @Column()
  paymentMethod: string;

  @Column({ type: 'enum', enum: PaymentStatus })
  status: PaymentStatus;

  @Column({ nullable: true })
  transactionId: string;
}
