import type Player from '../../Player';
import Card from '../Card';
import { CardType } from '../const';

abstract class Instant extends Card {
  readonly type = CardType.INSTANT;

  /**
   * Instant cards cannot be in a stable.
   */
  readonly inStable = false;

  /**
   * Instant cards cannot be in a stable.
   */
  readonly canProc = false;

  /**
   * Instant cards cannot be in a stable.
   */
  readonly canTarget = false;

  /**
   * Instant cards cannot be in a stable.
   */
  override enterStable(player: Player): void {}

  /**
   * Instant cards cannot be in a stable.
   */
  override leaveStable(): void {}

  /**
   * Instant cards cannot be in a stable.
   */
  override onDestroy(): void {}

  /**
   * Instant cards cannot be in a stable.
   */
  override onSacrifice(): void {}

  /**
   * Instant cards cannot be in a stable.
   */
  override onReturnToHand(): void {}
}

export default Instant;
