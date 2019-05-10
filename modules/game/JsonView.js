var { Forsyth } = require('jscity');

module.exports = {
  gameJson(game) {
    return {
      id: game.id,
      fen: Forsyth(game.star),
      player: game.turnSide(),
      turns: game.turns(),
      status: game.status,
      createdAt: game.createdAt
    };
  }
};
