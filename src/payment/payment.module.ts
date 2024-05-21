import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { paymentProvider } from './payment.provider';

@Module({
  controllers: [PaymentController],
  providers: [PaymentService, ...paymentProvider],
})
export class PaymentModule {}
