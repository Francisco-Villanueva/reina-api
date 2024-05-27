import { EVENT_PROVIDER } from 'src/core/constants';
import { Event } from './schema/event.model';

export const eventProvider = [
  {
    provide: EVENT_PROVIDER,
    useValue: Event,
  },
];
