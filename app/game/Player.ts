import type { Socket } from 'socket.io';

import Event from './utils/Event';

import type Game from './Game';
import type Card from './card/Card';
import { PlayerActionPayload, PlayerActionNames } from './playerActions';
import { TurnPhases } from './const';

class Player {
  /**
   * The name of the player. Must be unique.
   */
  name: string;

  /**
   * The player's socket reference.
   */
  private _socket: Socket;

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
   * State of player's turn.
   */
  turnPhase: TurnPhases = TurnPhases.OUT_OF_TURN;

  readonly phasesMap = {
    [TurnPhases.OUT_OF_TURN]: () => {},
    [TurnPhases.BEGINNING_OF_TURN]: this.beginningOfTurnPhase,
    [TurnPhases.DRAW]: this.drawPhase,
    [TurnPhases.ACTION]: this.actionPhase,
    [TurnPhases.END_OF_TURN]: this.endOfTurnPhase,
  };

  constructor(name: string, socket: Socket, game: Game) {
    this.name = name;
    this._socket = socket;
    this._game = game;
  }

  draw(i: number = 1) {
    const cards = this._game.deck.draw(i);

    cards.forEach((card) => card.enterHand(this));
  }

  action() {
    this.phasesMap[this.turnPhase]();

    this.nextPhase();
  }

  private nextPhase() {
    if (this.turnPhase === TurnPhases.END_OF_TURN) {
      this.turnPhase = TurnPhases.OUT_OF_TURN;
    } else {
      // turnPhases are represented as a number
      this.turnPhase++;
    }
  }

  private beginningOfTurnPhase() {
    this._game.eventManager.notify(Event.BEGINNING_OF_TURN, {
      game: this._game,
      currentPlayerInTurn: this,
    });

    this.stable.forEach((card) => card.beginningOfTurnPhase());
  }

  private drawPhase() {
    this.draw();
  }

  private actionPhase() {
    // TODO: implement socket.io message
  }

  private endOfTurnPhase() {
    this._game.eventManager.notify(Event.END_OF_TURN, {
      game: this._game,
      currentPlayerInTurn: this,
    });
    this._game.incrementTurn();

    this.stable.forEach((card) => card.endOfTurnPhase());
  }

  play() {
    // TODO: implement socket.io message
  }

  discard(i: number = 1) {
    // if (i > this.hand.length) do nothing (impossible actions)

    // TODO: implement socket.io message
  }

  sacrifice() {
    // if (this.stable.length === 0) do nothing (impossible action)
    // TODO: implement socket.io message
  }

  destroy() {
    // TODO: implement socket.io message
  }

  requestAction(requestedActionName: PlayerActionNames) {
    let awaitingAction = true;
    let response;
    const listener = (respondedAction: PlayerActionPayload) => {
      if (respondedAction.actionName !== requestedActionName) {
        this.sendError('Invalid action');
        return;
      }

      awaitingAction = false;
      response = respondedAction;
    };

    // begin listening for response
    this._socket.on('respondAction', listener);

    // make request
    this._socket.emit('requestAction');

    while (awaitingAction) {
      // check every 100ms if player has taken action
      setTimeout(() => {}, 100);
    }

    // stop listening for response (response has been received)
    this._socket.off('respondAction', listener);
  }

  sendError(message: string) {
    this._socket.emit('error', message);
  }
}

export default Player;
