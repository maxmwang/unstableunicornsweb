import type Card from './card/Card';
import type Player from './Player';

export interface PlayerActionPayload {
  actionName: PlayerActionNames;
  targetPlayerName?: Player['name'];
  targetCardId?: Card['id'];
}

export enum PlayerActionNames {
  /**
   * In the action phase, players can choose to:
   * - play a card
   * - draw a (second) card
   *
   * PlayerAction:
   * - targetCardId: the chosen card
   */
  PLAY = 'PLAY',
  DRAW = 'DRAW',

  /**
   * When prompted to choose a card
   *
   * PlayerAction:
   * - targetCardId: the chosen card
   */
  DESTROY = 'DESTROY',
  SACRIFICE = 'SACRIFICE',
  RETURN_TO_HAND = 'RETURN_TO_HAND',
  DISCARD = 'DISCARD',

  /**
   * When prompted to choose a player
   *
   * PlayerAction:
   * - targetPlayerId: the chosen player
   */

}

export enum GamePhases {
  LOBBY,
  ONGOING,
  OVER,
}

export enum TurnPhases {
  OUT_OF_TURN,
  BEGINNING_OF_TURN,
  DRAW,
  ACTION,
  END_OF_TURN,
}
