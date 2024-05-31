import { Inject, Injectable } from '@nestjs/common';
import { Payment } from './schema/payment.model';
import { PAYMENT_PROVIDER } from 'src/core/constants';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Op } from 'sequelize';
import { EventService } from 'src/event/event.service';
@Injectable()
export class PaymentService {
  constructor(
    @Inject(PAYMENT_PROVIDER) private readonly PaymentModel: typeof Payment,
    private readonly eventService: EventService,
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

  @Cron(CronExpression.EVERY_MINUTE)
  async updatePendingPayments(): Promise<void> {
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    const pendingPayments = await this.PaymentModel.findAll({
      where: {
        status: 'Pending',
        createdAt: {
          [Op.lt]: twoMinutesAgo,
        },
      },
    });

    await Promise.all(
      pendingPayments.map(async (payment) => {
        payment.update({ status: 'Refused' });

        const event = await this.eventService.getById(payment.EventId);
        if (event) {
          const updatedEvent = event.event.map((slot) => {
            if (slot.time.trim() === payment.time.trim()) {
              return {
                ...slot,
                availables: slot.availables + payment.quantity,
              };
            }
            return slot;
          });

          event.event = updatedEvent;
          await event.save();
        }
      }),
    );
  }
}
