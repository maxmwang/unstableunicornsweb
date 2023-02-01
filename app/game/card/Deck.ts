import type Player from '../Player';
import type Card from './Card';
import SearchableCards from './SearchableCards';
import type { DeckSource } from './const';

/**
 * A wrapper class for the deck of cards. Cards are drawn from here.
 */
class Deck extends SearchableCards {
  /**
   * The cards in the deck.
   */
  cards: Card[];

  constructor(deckSource: DeckSource) {
    super();

    this.cards = this.initializeDeck(deckSource);

    // shuffle the deck 10 times
    this.shuffle(10);
  }

  // TODO
  private initializeDeck(deckSource: DeckSource): Card[] {
    return [];
  }

  shuffle(count: number = 1) {
    for (let c = 0; c < count; c++) {
      for (let i = 0; i < this.cards.length; i++) {
        const j = Math.floor(Math.random() * this.cards.length);
        const temp = this.cards[i];
        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
      }
    }
  }

  draw(player: Player, i: number = 1) {
    if (i > this.cards.length) {
      throw new Error('Not enough cards in deck.');
    }
    const cards = this.cards.splice(this.cards.length - i, i);

    cards.forEach((card) => card.onDraw(player));
    player.hand.concat(cards);
  }
}

export default Deck;
