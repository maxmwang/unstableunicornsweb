import { CardType } from '../const';
import StableCard from '../StableCard';

abstract class UltimateUnicorn extends StableCard {
  readonly type = CardType.ULTIMATE_UNICORN;
}

export default UltimateUnicorn;
