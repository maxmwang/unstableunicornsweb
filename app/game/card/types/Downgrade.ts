import { CardType } from '../const';
import StableCard from '../StableCard';

abstract class Downgrade extends StableCard {
  readonly type = CardType.DOWNGRADE;
}

export default Downgrade;
