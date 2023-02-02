import type Player from '../../Player';
import Card from '../Card';
import { CardType } from '../const';

abstract class Magic extends Card {
  readonly type = CardType.MAGIC;

  /**
   * Magic cards cannot be in a stable.
   */
  readonly inStable = false;

  /**
   * Magic cards cannot be in a stable.
   */
  readonly canProc = false;

  /**
   * Magic cards cannot be in a stable.
   */
  readonly canTarget = false;

  /**
   * Magic cards cannot be in a stable.
   */
  override enterStable(player: Player): void {}

  /**
   * Magic cards cannot be in a stable.
   */
  override leaveStable(): void {}

  /**
   * Magic cards cannot be in a stable.
   */
  override onDestroy(): void {}

  /**
   * Magic cards cannot be in a stable.
   */
  override onSacrifice(): void {}

  /**
   * Instant cards cannot be in a stable.
   */
  override onReturnToHand(): void {}
}

export default Magic;
