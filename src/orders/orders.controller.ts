import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuards } from "src/auth/guards/jwt-auth.guard";
import { OrdersService } from "./order.service";
import { CreateOrderDto } from "./dto/create-order.dto";

@Controller('orders')
export class OrdersController{
    constructor(private readonly ordersService: OrdersService){}
    
    @UseGuards(JwtAuthGuards)
    @Post()
    create(@Req() req, @Body() dto: CreateOrderDto){
        return this.ordersService.create(req.user.id, dto);
    }

    @UseGuards(JwtAuthGuards)
    @Get('my')
    getMyOrders(@Req() req){
        return this.ordersService.getUserOrders(req.user.userId);
    }
}