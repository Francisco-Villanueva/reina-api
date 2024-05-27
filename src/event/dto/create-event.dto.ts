import { createZodDto } from '@anatine/zod-nestjs';
import { EventZodSchema } from '../validations/event.zod';

export class CreateEventDto extends createZodDto(EventZodSchema) {}
