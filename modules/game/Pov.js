var Game = require('./Game');

function Pov(game, side) {
  
}

const PovObject = {
  byPlayer(game, player) {
    return new Pov(game, player.side);
  },
  byPlayerId(game, playerId) {
    var _ = game.player(playerId);
    if (_) {
      return byPlayer(game, _);
    }
    return null;
  }
};

module.exports = PovObject;

const PlayerRef = function(fullId) {
  const PlayerRef = function(gameId, playerId) {
    this.gameId = gameId;
    this.playerId = playerId;
  };

  return new PlayerRef(Game.takeGameId(fullId), Game.takePlayerId(fullId));
};

module.exports.PlayerRef = PlayerRef;
