import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventServices: EventService) {}

  @Get()
  async getAll() {
    return this.eventServices.getAll();
  }
  @Post()
  async create(@Body() data: CreateEventDto) {
    return this.eventServices.create(data);
  }
  @Post('/one')
  async getById(@Body() { id }: { id: string }) {
    return this.eventServices.getById(id);
  }
  @Patch()
  async update(@Body() { data, id }: { data: CreateEventDto; id: string }) {
    return this.eventServices.update(data, id);
  }
  @Delete()
  async delet(@Body() { id }: { id: string }) {
    return this.eventServices.delete(id);
  }
}
