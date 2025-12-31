import { IsEnum, IsNumber, IsString, IsUUID } from "class-validator";
import { ProductStatus } from "src/database/enums/product-status.enum";


export class CreateProductDto{
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;

    @IsNumber   ()
    stockQuantity: number;

    @IsEnum(ProductStatus)
    status: ProductStatus

    @IsUUID()
    categoryId: string;
}