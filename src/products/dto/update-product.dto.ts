import { PartialType } from "@nestjs/mapped-types";
import { CreateCategoryDto } from "src/categories/dto/create-category.dto";


export class UpdateProductDto extends PartialType(CreateCategoryDto){}