import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuards } from "src/auth/guards/jwt-auth.guard";
import { PaymentsService } from "./payments.services";
import { CreatePaymentDto } from "./dto/create-payments.dto";

@Controller('payments')
@UseGuards(JwtAuthGuards)
export class PaymentsController {
  constructor(private paymentsService: PaymentsService) {}

  @Post()
  create(
    @Req() req,
    @Body() dto: CreatePaymentDto,
  ) {
    return this.paymentsService.create(req.user, dto);
  }
}

