import { CardType } from '../const';
import StableCard from '../StableCard';

/**
 * BabyUnicorns are all the same, thus class does not need to be abstract.
 */
abstract class UltimateUnicorn extends StableCard {
  readonly type = CardType.ULTIMATE_UNICORN;
}

export default UltimateUnicorn;
