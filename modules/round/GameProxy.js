var GameRepo = require('../game/GameRepo');

var Pov = require('../game/Pov');

module.exports = function GameProxy(id) {
  this.id = id;

  this.game = () => cache;

  this.save = (progress) => {
    this.set(progress.game);
    return GameRepo.save(progress);
  };

  this.set = (game) => {
    cache = Promise.resolve(game);
  };

  this.pov = (side) => {
    this.game().then(g => {
      if (g) {
        return Pov.bySide(g, side);
      }
      return g;
    });
  };

  this.playerPov = (playerId) => {
    return this.game().then(g => {
      if (g) {
        return Pov.byPlayerId(g, playerId);
      }
      return g;
    });
  };

  this.fetch = () => GameRepo.game(id);

  var cache = this.fetch();
  
};
