var Status = require('jscity/status');

var GameRepo = require('../game/GameRepo');

module.exports = function Finisher() {
  
  this.other = (game, winner, proxy) => {
    return this.apply(game, winner, proxy);
  };

  this.apply = (game, winner, proxy) => {
    var status = Status.VariantEnd;
    var prog = game.finish(winner, status);
    proxy.save(prog);
    return GameRepo
      .finish(game.id,
              winner,
              status)
      .then(_ => prog.events);
  };
  
  
};
