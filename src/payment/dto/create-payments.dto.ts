import { IsEnum, IsUUID } from 'class-validator';
import { PaymentMethod } from 'src/database/enums/payment-method.enum';

export class CreatePaymentDto {
  @IsUUID()
  orderId: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}
