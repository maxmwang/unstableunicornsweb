import type { Socket } from 'socket.io';

import type Card from './card/Card';
import { DeckSource } from './card/const';
import Deck from './card/Deck';
import Discard from './card/Discard';
import Stack from './card/Stack';
import { GamePhases, TurnPhases } from './const';
import Player from './Player';
import type { EventPayload } from './utils/Event';
import Event from './utils/Event';
import EventManager from './utils/EventManager';
import type Observer from './utils/Observer';

/**
 * Serves as the Mediator in the Mediator pattern. As such,
 * players will have a reference to their game object.
 */
class Game implements Observer {
  // TODO: add more properties

  /**
   * A randomly generated string of letters used to join the game.
   */
  code: string;

  /**
   * The current phase of the game.
   * 'lobby' - players are joining the game, can choose a baby unicorn.
   * 'ongoing' - game is in progress.
   * 'over' - game is over (someone won).
   */
  phase: GamePhases = GamePhases.LOBBY;

  /**
   * A list of players in the game. Players do not need to access references
   * to other players (based on the Mediator pattern).
   */
  private _players: Player[] = [];

  /**
   * Turn number.
   */
  private _turn: number = 0;

  /**
   * The deck. Cards are drawn from here.
   */
  deck: Deck;

  /**
   * The discard pile. Cards are placed here when played.
   */
  discard: Discard = new Discard();

  /**
   * The nursery. Baby Unicorns are placed here.
   */
  nursery: Card[] = [];

  /**
   * The stack. Currently playing cards are placed here on a LIFO basis.
   */
  private _stack: Stack = new Stack();

  /**
   * Emits events to subscribers. Primary way of communication between components.
   */
  eventManager: EventManager = new EventManager();

  // TODO: game options (e.g. deck source)
  constructor(code: string, deckSource: DeckSource = DeckSource.STANDARD) {
    this.code = code;

    this.deck = new Deck(deckSource);
    this.nursery = this.deck.getNurseryCards();

    this.eventManager.subscribe(this);
  }

  onNotify(event: Event, payload: EventPayload) {
    if (event === Event.GAME_END) {
      this.phase = GamePhases.OVER;
    }
  }

  addPlayer(name: string, socket: Socket) {
    if (this.phase !== GamePhases.LOBBY) {
      throw new Error('Game has already started.');
    }
    this._players.push(new Player(name, socket, this));
  }

  removePlayer(name: string) {
    if (this.phase !== GamePhases.LOBBY) {
      // if game has started, move all cards to discard pile
      const player = this._players.find((p) => p.name === name);
      if (player) {
        this.discard.concat(player.hand);
        this.discard.concat(player.stable);
      }
    }

    this._players = this._players.filter((player) => player.name !== name);
  }

  start() {
    if (this.phase !== GamePhases.LOBBY) {
      throw new Error('Game has already started.');
    }

    if (this._players.length < 2) {
      throw new Error('Not enough players.');
    }

    this.phase = GamePhases.ONGOING;

    // randomize player order
    for (let i = 0; i < this._players.length; i++) {
      const j = Math.floor(Math.random() * this._players.length);
      const temp = this._players[i];
      this._players[i] = this._players[j];
      this._players[j] = temp;
    }

    // players pick a baby unicorn

    // players start with 5 cards in hand
    this._players.forEach((player) => {
      player.draw(5);
    });

    while (this.phase === GamePhases.ONGOING) {
      this.getCurrentPlayerInTurn().action();

      // slow down the game loop
      setTimeout(() => {}, 10);
    }
  }

  incrementTurn() {
    this._turn = (this._turn + 1) % this._players.length;
  }

  /**
   * Used for "Change of Luck" (id: 0058)
   */
  decrementTurn() {
    this._turn = this._turn - 1 < 0 ? this._players.length - 1 : this._turn - 1;
  }

  getCurrentPlayerInTurn(): Player {
    return this._players[this._turn];
  }
}

export default Game;
