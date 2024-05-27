import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { paymentProvider } from './payment.provider';
import { EventModule } from 'src/event/event.module';
import { eventProvider } from 'src/event/event.provider';
import { EventService } from 'src/event/event.service';

@Module({
  imports: [EventModule],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    EventService,
    ...paymentProvider,
    ...eventProvider,
  ],
})
export class PaymentModule {}
