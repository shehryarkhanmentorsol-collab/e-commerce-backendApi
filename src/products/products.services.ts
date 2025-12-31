import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/database/entities/category.entity";
import { Product } from "src/database/entities/product.entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService{
    constructor(
        @InjectRepository(Product)
         private readonly productRepo: Repository<Product>,
    @InjectRepository(Category) private readonly categoryRepo: Repository<Category>
){}

    async create(dto: CreateProductDto){
        const category = await this.categoryRepo.findOne({where:{id: dto.categoryId}})

        if(!category){
            throw new NotFoundException("category not found")
        }

       const product = this.productRepo.create({
        name: dto.name,
        description: dto.description,
        price: dto.price,
        stockQuantity: dto.stockQuantity,
        status: dto.status,
        category: category,
       }) 

       return this.productRepo.save(product)
    }

    findAll(){
        return this.productRepo.find({
            relations:['category']
        })
    }

    findOne(id: string) {
    return this.productRepo.findOne({
    where: { id },
    relations: ['category'],
  });
}
}