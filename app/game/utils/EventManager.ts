import Observer from './Observer';
import type Event from './Event';
import type { EventPayload } from './Event';

/**
 * EventManager is a class that manages the events based on the Observer paradigm
 *
 * More info: https://gameprogrammingpatterns.com/observer.html
 */
class EventManager {
  observers: Observer[];

  constructor() {
    this.observers = [];
  }

  subscribe(o: Observer) {
    this.observers.push(o);
  }

  unsubscribe(o: Observer) {
    this.observers = this.observers.filter((observer) => observer !== o);
  }

  notify(event: Event, payload: EventPayload) {
    this.observers.forEach((observer) => observer.onNotify(event, payload));
  }
}

export default EventManager;
