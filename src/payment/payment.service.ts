import { Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class PaymentService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET, {
      apiVersion: '2024-10-28.acacia',
    });
  }

  async createPaymentIntent(amount: number, currency: string) {
    try {
      return await this.stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_types: ['card'],
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Payment creation failed: ${error}`,
      );
    }
  }

  async confirmPayment(paymentIntentId: string) {
    return await this.stripe.paymentIntents.confirm(paymentIntentId);
  }
}
