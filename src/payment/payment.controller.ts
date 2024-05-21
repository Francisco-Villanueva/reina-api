import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './schema/payment.model';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get('/')
  async getAll() {
    try {
      return this.paymentService.getAllPayments();
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  @Get('/:id')
  async getById(@Param() { id }: { id: Payment['id'] }) {
    try {
      return this.paymentService.getById(id);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  @Post()
  async createPayment(@Body() payment: CreatePaymentDto) {
    try {
      return await this.paymentService.createPayment(payment);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
