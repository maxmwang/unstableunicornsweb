import type Game from './Game';
import type Card from './card/Card';
import type Deck from './card/Deck';

class Player {
  /**
   * The name of the player. Must be unique.
   */
  name: string;

  /**
   * The reference to the game.
   */
  private _game: Game;

  /**
   * The cards in the player's stable.
   */
  stable: Card[] = [];

  /**
   * The cards in the player's hand.
   */
  hand: Card[] = [];

  /**
   * The Player's next action to be taken in the game.
   * In the game loop checks if this is non-null and executes the action.
   */
  nextAction: Action;

  constructor(name: string, game: Game) {
    this.name = name;
    this._game = game;
  }

  draw(i: number = 1) {
    const cards = this._game.deck.draw(i);

    cards.forEach((card) => card.enterHand(this));
  }

  play() {
    // TODO: implement socket.io message
  }

  discard() {
    // TODO: implement socket.io message
  }

  sacrifice() {
    // TODO: implement socket.io message
  }

  destroy() {
    // TODO: implement socket.io message
  }
}

export default Player;
