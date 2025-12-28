import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity('category')
export class Category{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    slug: string;

    @ManyToOne(()=> Category, category => category.children, {nullable: true})
    parent: Category;

    @OneToMany(()=> Category, category => category.parent)
    children: Category[];

    @OneToMany(()=> Product, product => product.category)
    products: Product[]
}
