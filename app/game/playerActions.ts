interface PlayerAction {

}

enum PlayerActions {
  /**
   * In the action phase, players can choose to:
   * - play a card
   * - draw a (second) card
   */
  PLAY,
  DRAW,

  DESTROY,
  SACRIFICE,
  RETURN_TO_HAND,
  DISCARD,

}
