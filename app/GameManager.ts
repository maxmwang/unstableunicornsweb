import Game from './game/Game';

class GameManager {
  /**
   * Map of games by their (unique) code.
   */
  games: { [key: string]: Game };

  constructor() {
    this.games = {};
  }

  createGame() {
    const newGame = new Game(this.generateUniqueCode());
    this.games[newGame.code] = newGame;
    return newGame;
  }

  endGame(code: string) {
    delete this.games[code];
  }

  private generateUniqueCode(): string {
    let code = '';
    do {
      code = Math.random().toString(36).substring(2, 8);
    } while (this.games[code]);
    return code;
  }
}

export default GameManager;
