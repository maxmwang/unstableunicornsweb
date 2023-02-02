import type Player from '../../Player';
import { CardType } from '../const';
import StableCard from '../StableCard';

/**
 * BabyUnicorns are all the same, thus class does not need to be abstract.
 */
class BabyUnicorn extends StableCard {
  readonly type = CardType.BABY_UNICORN;

  override onDestroy(): void {
    if (!this.inStable || !this.player) {
      return;
    }

    this.leaveStable();
    this.moveToNursery();
  }

  override onSacrifice(): void {
    if (!this.inStable || !this.player) {
      return;
    }

    this.leaveStable();
    this.moveToNursery();
  }

  override onReturnToHand(): void {
    if (!this.inStable || !this.player) {
      return;
    }

    this.leaveStable();
    this.moveToNursery();
  }

  /**
   * BabyUnicorns can never in a player's hand.
   */
  protected override moveToHand(player: Player) {}

  /**
   * BabyUnicorns can never in a player's hand.
   */
  protected override moveToDiscard() {}

  private moveToNursery() {
    this.player = null;
    this.game.nursery.push(this);
  }
}

export default BabyUnicorn;
