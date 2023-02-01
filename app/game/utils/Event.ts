import type Game from '../Game';
import type Player from '../Player';
import type Card from '../card/Card';

enum Event {
  /**
   * A card enters the stable.
   *
   * Cards include:
   * - Barbed Wire (id: 0087)
   *
   * Payload includes:
   * - game
   * - currentPlayerInTurn
   * - targetPlayer - the player that owns the stable
   * - currentCardInPlay
   * - targetCard - the card that entered the stable
   */
  CARD_ENTER_STABLE,

  /**
   * A card leaves the stable.
   *
   * Cards include:
   * - Barbed Wire (id: 0087)
   *
   * Payload includes:
   * - game
   * - currentPlayerInTurn
   * - targetPlayer - the player that owns the stable
   * - targetCard - the card that entered the stable
   */
  CARD_EXIT_STABLE,

  /**
   * A player chose a card to be destroyed.
   *
   * Cards include:
   * - Black Knight Unicorn (id: 0026)
   *
   * Payload includes:
   * - game
   * - currentPlayerInTurn
   * - targetPlayer - the player that owns the card to be destroyed
   * - targetCard - the card to be destroyed
   */
  CARD_WOULD_BE_DESTROYED,

  /**
   * A player's turn starts.
   *
   * Cards include:
   * - Double Dutch (id: 0076)
   *
   * Payload includes:
   * - game
   * - currentPlayerInTurn - the player whose turn is starting
   */
  TURN_START,

  /**
   * A player's turn starts.
   *
   * Cards include:
   * - Puppicorn (id: 0041)
   *
   * Payload includes:
   * - game
   * - previousPlayerInTurn - the player before the player whose turn is ending
   * - currentPlayerInTurn - the player whose turn is ending
   */
  TURN_END,

  /**
   * The end of the game.
   *
   * Occurs when:
   * - Someone has enough Unicorns.
   * - There are no more cards in the deck.
   *
   * Payload includes:
   * - game
   * - currentPlayerInTurn
   * - targetPlayer - the player that won
   */
  GAME_END,
}

export interface EventPayload {
  game: Game;
  previousPlayerInTurn?: Player;
  currentPlayerInTurn: Player;
  nextPlayerInTurn?: Player;
  targetPlayer?: Player;
  currentCardInPlay?: Card;
  targetCard?: Card;
}

export default Event;
