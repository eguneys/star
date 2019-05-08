var GameProxy = require('./GameProxy');

class Round {
  constructor(gameId) {
    this.gameId = gameId;

    this.proxy = new GameProxy(gameId);
  }

  getGame() { return this.proxy.game(); }
}

module.exports = Round;
