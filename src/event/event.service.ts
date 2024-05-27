import { Inject, Injectable } from '@nestjs/common';
import { EVENT_PROVIDER } from 'src/core/constants';
import { Event } from './schema/event.model';
import { Payment } from 'src/payment/schema/payment.model';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject(EVENT_PROVIDER) private readonly eventModel: typeof Event,
  ) {}

  async getAll(): Promise<Event[]> {
    return this.eventModel.findAll({ include: [Payment] });
  }
  async getById(id: Event['id']): Promise<Event> {
    return this.eventModel.findByPk(id);
  }
  async create(newEvent: CreateEventDto): Promise<Event> {
    return this.eventModel.create(newEvent);
  }
  async update(eventData: Partial<Event>, id: Event['id']) {
    return this.eventModel.update(eventData, {
      where: { id },
    });
  }
  async delete(id: Event['id']) {
    return this.eventModel.destroy({ where: { id } });
  }
}
