import type Card from './Card';
import SearchableCards from './SearchableCards';

/**
 * A wrapper class for the discard pile. Cards are discarded here.
 */
class Discard extends SearchableCards {
  addCard(card: Card) {
    this.cards.push(card);
  }

  addSomeCards(cards: Card[]) {
    this.cards.concat(cards);
  }

  /**
   * Never shuffle the discard pile.
   */
  shuffle(i: number = 0) {}
}

export default Discard;
