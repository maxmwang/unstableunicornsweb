import type Game from '../Game';
import type Player from '../Player';
import type Card from '../card/Card';

enum Event {
  CARD_ENTER_STABLE,
  CARD_EXIT_STABLE,
  CARD_WOULD_BE_DESTROYED,
  TURN_START,
  TURN_END,
  GAME_END,
}

export interface EventPayload {
  game: Game;
  currentPlayerInTurn: Player;
  targetPlayer?: Player;
  currentCardInPlay?: Card;
  targetCard?: Card;
}

export default Event;
