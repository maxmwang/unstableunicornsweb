import type Card from './Card';
import SearchableCards from './SearchableCards';

/**
 * A wrapper class for the discard pile. Cards are discarded here.
 */
class Discard extends SearchableCards {
  /**
   * Never shuffle the discard pile.
   */
  shuffle(i: number = 0) {}
}

export default Discard;
