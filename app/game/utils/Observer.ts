import type Event from './Event';
import type { EventPayload } from './Event';

interface Observer {
  onNotify: (event: Event, payload: EventPayload) => void;
}

export default Observer;
