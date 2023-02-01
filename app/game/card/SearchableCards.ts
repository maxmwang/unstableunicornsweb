import type Card from './Card';

abstract class SearchableCards {
  cards: Card[] = [];

  abstract shuffle(count: number): void;

  /**
   * A function that returns a list of cards that match the query.
   */
  search(query: string): Card[] {
    // TODO: implement search

    this.shuffle(1);

    return this.cards;
  }
}

export default SearchableCards;
