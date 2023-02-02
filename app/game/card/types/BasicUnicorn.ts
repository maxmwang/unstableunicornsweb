import type Event from '../../utils/Event';
import type { EventPayload } from '../../utils/Event';

import { CardType } from '../const';
import StableCard from '../StableCard';

/**
 * BasicUnicorns are all the same, thus class does not need to be abstract.
 */
class BabyUnicorn extends StableCard {
  readonly type = CardType.BASIC_UNICORN;

  onNotify(event: Event, payload: EventPayload) : void {}
}

export default BabyUnicorn;
