import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/database/entities/category.entity";
import { Repository } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoriesService{
    constructor(@InjectRepository(Category) private readonly categoryRepo: Repository<Category>){}


async create(dto: CreateCategoryDto) {
  const category = this.categoryRepo.create({
    name: dto.name,
    slug: dto.name.toLowerCase().replace(/\s+/g, '-'),
  });

  if (dto.parentId) {
    const parent = await this.categoryRepo.findOne({
      where: { id: dto.parentId },
    });

    if (!parent) {
      throw new NotFoundException('Parent category not found');
    }

    category.parent = parent;
  }

  return this.categoryRepo.save(category);
}

    findAll(){
        return this.categoryRepo.find({
            relations:['children'],
        })
    }
}