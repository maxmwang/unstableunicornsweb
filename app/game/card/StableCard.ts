import Card from './Card';

/**
 * Any card that can be placed in a stable:
 * - Upgrade/Downgrade
 * - any type of Unicorn
 */
abstract class StableCard extends Card {
  onPlay() {
    if (!this.player) {
      return;
    }

    this.leaveHand();
    this.enterStable(this.player);
  }
}

export default StableCard;
