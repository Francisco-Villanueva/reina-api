import { PAYMENT_PROVIDER } from 'src/core/constants';
import { Payment } from './schema/payment.model';

export const paymentProvider = [
  {
    provide: PAYMENT_PROVIDER,
    useValue: Payment,
  },
];
