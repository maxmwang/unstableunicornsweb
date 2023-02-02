import { CardType } from '../const';
import StableCard from '../StableCard';

abstract class Upgrade extends StableCard {
  readonly type = CardType.UPGRADE;
}

export default Upgrade;
