import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { UsersServices } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { JwtAuthGuards } from "src/auth/guards/jwt-auth.guard";
import { Roles } from "src/common/decorators/roles.decorators";
import { UserRole } from "src/database/enums/user-role.enums";
import { RolesGuard } from "src/auth/guards/roles.guard";

@Controller('users')
export class UserController{
    constructor(private readonly usersServices: UsersServices){}

    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.usersServices.create(createUserDto)
    }

    // Protected routes

    @UseGuards(JwtAuthGuards)
    @Get('profile')
    Profile(@Req() req){
        return{
            message: 'Protected routes accessed',
            user: req.user
        }
    }

    
    @Get('admin-only')
    @UseGuards(JwtAuthGuards, RolesGuard)
    @Roles(UserRole.ADMIN)
    adminRoute() {
    return { message: 'Welcome Admin 👑' };
  }
}