import type Card from './Card';

/**
 * A wrapper class for the stack. Played cards are entered
 * into the stack before their effect is resolved.
 */
class Stack {
  cards: Card[] = [];

  push(card: Card) {
    this.cards.push(card);
  }

  concat(i: number): Card {
    return this.cards.splice(i, 1)[0];
  }
}

export default Stack;
