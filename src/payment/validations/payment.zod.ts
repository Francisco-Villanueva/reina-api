import { z } from 'zod';
import { PAYMENT_STATUSES } from '../interfaces/payment.interface';

export const PaymentZodSchema = z.object({
  status: z.enum(PAYMENT_STATUSES),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  dni: z.string(),
  time: z.string(),
  quantity: z.string(),
  EventId: z.string(),
  method: z.string().optional(),
  paymentDate: z.string().optional(),
  amount: z.number().optional(),
});
