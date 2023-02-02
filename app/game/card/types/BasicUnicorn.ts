import { CardType } from '../const';
import StableCard from '../StableCard';

/**
 * BasicUnicorns are all the same, thus class does not need to be abstract.
 */
class BabyUnicorn extends StableCard {
  readonly type = CardType.BASIC_UNICORN;
}

export default BabyUnicorn;
