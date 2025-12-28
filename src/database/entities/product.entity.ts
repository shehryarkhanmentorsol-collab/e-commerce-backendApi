import { ProductStatus} from "../enums/product-status.enum";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";
import { OrderItem } from "./order-item.entity";
import { Review } from "./review.entity";

@Entity('products')
export class Product{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column('text')
    description: string;

    @Column('decimal')
    price: number;

    @Column()
    stockQuantity: number

    @Column({type: 'enum', enum: ProductStatus})
    status: ProductStatus

    @ManyToOne(()=> Category, category => category.products)
    category: Category;

    @OneToMany(()=> OrderItem, item => item.product)
    orderItem: OrderItem[];

    @OneToMany(()=> Review, review=> review.product)
    reviews: Review[]
}