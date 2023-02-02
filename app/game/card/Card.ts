import { runInThisContext } from 'vm';
import type Observer from '../utils/Observer';
import Event from '../utils/Event';
import type { EventPayload } from '../utils/Event';

import type Game from '../Game';
import type Player from '../Player';
import { CardType } from './const';

/**
 * ...
 *
 * A card will handle its own location (deck, hand, stable, discard, etc.)
 */
abstract class Card implements Observer {
  /**
   * The type of the card.
   */
  abstract type: CardType;

  /**
   * The name of the card.
  */
  name: string;

  /**
   * The ID of the card. Must be unique. Used to map to card image.
   */
  id: string;

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

  constructor(game: Game, name: string, id: string) {
    this.game = game;
    this.name = name;
    this.id = id;

    this.player = null;
    this.canPlay = true;
    this.inStable = false;
    this.canProc = true;
    this.canTarget = true;
  }

  abstract onNotify(event: Event, payload: EventPayload) : void;

  abstract onPlay(player: Player) : void;

  enterHand(player: Player) {
    if (this.player) {
      this.leaveHand();
    }

    this.moveToHand(player);
  }

  leaveHand() {
    if (!this.player) {
      return;
    }

    this.player.hand.filter((card) => card !== this);
  }

  enterStable(player: Player) {
    if (this.inStable) {
      this.leaveStable();
    }

    this.moveToStable(player);
    this.game.eventManager.notify(Event.CARD_ENTER_STABLE, {
      game: this.game,
      currentPlayerInTurn: this.game.getCurrentPlayerInTurn(),
      targetPlayer: this.player!,
      targetCard: this,
    });
  }

  leaveStable() {
    if (!this.inStable || !this.player) {
      return;
    }

    this.player.stable.filter((card) => card !== this);
    this.game.eventManager.notify(Event.CARD_LEAVE_STABLE, {
      game: this.game,
      currentPlayerInTurn: this.game.getCurrentPlayerInTurn(),
      targetPlayer: this.player,
      targetCard: this,
    });
  }

  onDestroy() {
    if (!this.inStable || !this.player) {
      return;
    }

    this.leaveStable();
    this.moveToDiscard();
  }

  onSacrifice() {
    if (!this.inStable || !this.player) {
      return;
    }

    this.leaveStable();
    this.moveToDiscard();
  }

  onReturnToHand() {
    if (!this.inStable || !this.player) {
      return;
    }

    this.leaveStable();
    this.moveToHand(this.player);
  }

  onDiscard() {
    if (!this.player) {
      return;
    }

    this.leaveHand();
    this.moveToDiscard();
  }

  protected moveToHand(player: Player) {
    this.player = player;
    this.player.hand.push(this);
  }

  protected moveToStable(player: Player) {
    this.player = player;
    this.player.stable.push(this);
  }

  protected moveToDiscard() {
    this.player = null;
    this.game.discard.push(this);
  }
}

export default Card;
