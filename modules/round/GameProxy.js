var GameRepo = require('../game/GameRepo');

module.exports = function GameProxy(id) {
  this.id = id;

  this.game = () => cache;

  this.fetch = () => GameRepo.game(id);

  var cache = this.fetch();
  
};
