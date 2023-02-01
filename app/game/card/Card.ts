import type Observer from '../utils/Observer';
import type Event from '../utils/Event';
import type { EventPayload } from '../utils/Event';

import type Game from '../Game';
import type Player from '../Player';
import { CardType } from './const';

abstract class Card implements Observer {
  /**
   * The type of the card.
   */
  abstract type: CardType;

  /**
   * The name of the card.
  */
  abstract name: string;

  /**
   * The ID of the card. Must be unique. Used to map to card image.
   */
  abstract id: string;

  /**
   * The game that the card is in.
   */
  game: Game;

  /**
   * The player that owns the card.
   * Is assigned when:
   * - card is drawn
   * - card enters stable
   */
  player: Player | null;

  /**
   * If card can be played from hand.
   * Defaults to true.
   * Will be false if:
   * - Not player's turn (unless is an instant card)
   * - Another card is preventing it from being played.
   */
  canPlay: boolean;

  /**
   * If card is in a stable.
   * Player must be non-null.
   */
  inStable: boolean;

  /**
   * If card can proc effects.
   * Defaults to true.
   * Inactive cards have no effects.
   * Will be false if:
   * - Blinding Light is in stable
   * - etc.
   */
  canProc: boolean;

  /**
   * If card can be targetted by another card.
   * Defaults to true.
   * Will be false if:
   * - Pandamonium is in stable.
   * - Rainbow aura is in stable.
   * - etc.
   */
  canTarget: boolean;

  constructor(game: Game) {
    this.game = game;

    this.player = null;
    this.canPlay = true;
    this.inStable = false;
    this.canProc = true;
    this.canTarget = true;
  }

  abstract onNotify(event: Event, payload: EventPayload) : void;

  abstract onPlay() : void;

  onDraw(player: Player) {
    this.player = player;
  }

  enterStable(player: Player) {
    this.player = player;
  }

  leaveStable() {
    if (!this.inStable || !this.player) {
      return;
    }

    this.player.stable.filter((card) => card !== this);
  }

  onDestroy() {
    if (!this.inStable || !this.player) {
      return;
    }

    this.leaveStable();
  }

  onSacrifice() {
    if (!this.inStable || !this.player) {
      return;
    }

    this.leaveStable();
  }
}

export default Card;
