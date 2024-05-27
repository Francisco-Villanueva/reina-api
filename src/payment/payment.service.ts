import { Inject, Injectable } from '@nestjs/common';
import { Payment } from './schema/payment.model';
import { PAYMENT_PROVIDER } from 'src/core/constants';
@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_PROVIDER) private readonly PaymentModel: typeof Payment,
  ) {}

  async getAllPayments(): Promise<Payment[]> {
    return this.PaymentModel.findAll();
  }
  async getById(id: Payment['id']): Promise<Payment> {
    return this.PaymentModel.findOne({
      where: { id },
    });
  }
  async delete(id: Payment['id']): Promise<number> {
    return this.PaymentModel.destroy({
      where: { id },
    });
  }
  async createPayment(payment: Partial<Payment>): Promise<Payment> {
    return this.PaymentModel.create(payment);
  }
  async update(
    payment: Partial<Payment>,
    id: Payment['id'],
  ): Promise<[number]> {
    return this.PaymentModel.update(payment, { where: { id } });
  }
}
