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

  constructor(name: string, game: Game) {
    this.name = name;
    this._game = game;
  }

  draw(i: number = 1) {
    this._game.deck.draw(this);
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
