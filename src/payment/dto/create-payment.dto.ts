import { createZodDto } from '@anatine/zod-nestjs';
import { PaymentZodSchema } from '../validations/payment.zod';

export class CreatePaymentDto extends createZodDto(PaymentZodSchema) {}
