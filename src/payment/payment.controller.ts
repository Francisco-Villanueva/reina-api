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
    const parsedPayment = {
      ...payment,
      quantity: parseInt(payment.quantity),
    };
    try {
      const event = await this.eventService.getById(payment.EventId);
      if (!event) throw new UnauthorizedException('Event Not Found');
      const selectedEventSlot = event.event.filter((e) => e.time === time)[0];
      if (selectedEventSlot.availables < 1)
        throw new UnauthorizedException(
          'No hay mas tickets disponibles para el evento y horario elegidos!',
        );
      if (selectedEventSlot.availables - parsedPayment.quantity < 0)
        throw new UnauthorizedException(
          'La cantidad de entradas, supera la cantidad disponible!',
        );

      const payemntDetails = await this.paymentService.createPayment({
        ...parsedPayment,
        amount: payment.amount * parsedPayment.quantity,
        time,
      });

      const updatedEvent = event.event.map((slot) => {
        if (slot.time.trim() === time.trim()) {
          return {
            ...slot,
            availables: slot.availables - parsedPayment.quantity,
          };
        }
        return slot;
      });

      if (parsedPayment.status === 'Approved') {
      }
      event.event = updatedEvent;
      await event.save();

      return payemntDetails;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
  @Post('/restore')
  async refactorEvent(@Body() { paymentId }: { paymentId: string }) {
    try {
      const payemntDetails = await this.paymentService.getById(paymentId);
      if (!payemntDetails) {
        throw new UnauthorizedException('Payment details Not Found');
      }
      const event = await this.eventService.getById(payemntDetails.EventId);
      if (!event) {
        throw new UnauthorizedException('Event Not Found');
      }

      const updatedEvent = event.event.map((slot) => {
        if (slot.time.trim() === payemntDetails.time.trim()) {
          return {
            ...slot,
            availables: slot.availables + payemntDetails.quantity,
          };
        }
        return slot;
      });

      if (payemntDetails.status === 'Approved') {
        event.event = updatedEvent;
        await event.save();
      }

      return {
        message: 'Event updated',
        event,
      };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
