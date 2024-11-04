import { Controller, Post, Body } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('create-payment-intent')
  async createPaymentIntent(
    @Body() body: { amount: number; currency: string },
  ) {
    return this.paymentService.createPaymentIntent(body.amount, body.currency);
  }

  @Post('confirm')
  async confirmPayment(@Body() body: { paymentIntentId: string }) {
    return this.paymentService.confirmPayment(body.paymentIntentId);
  }
}
