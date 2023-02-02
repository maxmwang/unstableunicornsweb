import type Card from './card/Card';

export interface PlayerActionPayload {
  actionName: PlayerActionNames;
  targetPlayerId?: Player['id'];
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
