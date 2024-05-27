import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { Payment } from './schema/payment.model';
import { EventService } from 'src/event/event.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly eventService: EventService,
  ) {}

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
  @Patch('/update')
  async update(
    @Body() { id, data }: { id: Payment['id']; data: Partial<Payment> },
  ) {
    try {
      const [paymeStatus] = await this.paymentService.update(data, id);

      return paymeStatus === 1
        ? 'Updated Succesfully'
        : 'Error at Updating Payment Details';
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  @Post('/delete')
  async delete(@Body() { id }: { id: Payment['id'] }) {
    try {
      const isDeleted = await this.paymentService.delete(id);

      return isDeleted === 1
        ? 'Deleted Succesfully'
        : 'Error at deleting Payment';
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  @Post()
  async createPayment(
    @Body() { payment, time }: { payment: CreatePaymentDto; time: string },
  ) {
    try {
      const event = await this.eventService.getById(payment.EventId);
      if (!event) {
        throw new UnauthorizedException('Event Not Found');
      }
      const updatedEvent = event.event.map((slot) => {
        if (slot.time.trim() === time.trim()) {
          return {
            ...slot,
            availables: slot.availables - 1,
          };
        }
        return slot;
      });

      event.event = updatedEvent;
      await event.save();
      const payemntDetails = await this.paymentService.createPayment(payment);

      return payemntDetails;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
