import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.services";
import { JwtAuthGuards } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/database/enums/user-role.enums";
import { CreateProductDto } from "./dto/create-product.dto";


@Controller('products')
export class ProductsController{
    constructor(private readonly service: ProductsService){}

    @Post()
    @UseGuards(JwtAuthGuards, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Body() dto: CreateProductDto){
        return this.service.create(dto)
    }

    @Get()
    findAll(){
        return this.service.findAll()
    }
}