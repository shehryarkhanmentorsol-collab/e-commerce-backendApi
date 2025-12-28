import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { JwtAuthGuards } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/database/enums/user-role.enums";
import { CreateCategoryDto } from "./dto/create-category.dto";


@Controller('categories')
export class CategoriesController{
    constructor(private readonly service: CategoriesService){}


    @Post()
    @UseGuards(JwtAuthGuards, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(@Body() dto: CreateCategoryDto){
        return this.service.create(dto)
    }

    @Get()
    findAll(){
        return this.service.findAll()
    }
}