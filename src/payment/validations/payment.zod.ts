import { z } from 'zod';
import { PAYMENT_STATUSES } from '../interfaces/payment.interface';

export const PaymentZodSchema = z.object({
  status: z.enum(PAYMENT_STATUSES),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  method: z.string().optional(),
  paymentDate: z.string().optional(),
  amount: z.number().optional(),
});
