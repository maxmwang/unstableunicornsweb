import { CardType } from '../const';
import StableCard from '../StableCard';

abstract class MagicalUnicorn extends StableCard {
  readonly type = CardType.MAGICAL_UNICORN;
}

export default MagicalUnicorn;
