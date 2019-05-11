var GameRepo = require('../game/GameRepo');

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

  this.fetch = () => GameRepo.game(id);

  var cache = this.fetch();
  
};
