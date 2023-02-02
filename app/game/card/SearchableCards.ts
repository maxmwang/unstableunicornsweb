import type Card from './Card';

abstract class SearchableCards {
  cards: Card[] = [];

  abstract shuffle(count: number): void;

  push(card: Card): void {
    this.cards.push(card);
  }

  concat(cards: Card[]): void {
    this.cards.concat(cards);
  }

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
