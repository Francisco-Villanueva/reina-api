import { z } from 'zod';

const EventDetailsZodSchema = z.object({
  time: z.string().nonempty(),
  availables: z.number(),
});
export type EventDetails = z.infer<typeof EventDetailsZodSchema>;
export const EventZodSchema = z.object({
  date: z.string(),
  title: z.string(),
  subTitle: z.string(),
  price: z.number(),
  isPrivate: z.boolean(),
  event: z.array(EventDetailsZodSchema),
  description: z.array(z.string()),
});

export type IEvent = z.infer<typeof EventZodSchema>;
