var { Move } = require('jscity/move');

module.exports = function Player() {
  
  this.fishnet = (game, uci, proxy) => {
    if (game.playable() && game.player().isAi()) {
      var progress = applyUci(game, uci);

      if (progress) {
        return proxy.save(progress)
          .finally(_ => {
          
          }).then(_ => {
            return progress.events;
          });
      } else {
        return Promise.reject("client error");
      }
    } else return Promise.reject("Not AI turn");
  };

  function applyUci(game, uci) {
    var move = Move.apply(uci);
    const newGame = game.star.move(move);

    if (!newGame) {
      return null;
    }

    return game.update(newGame, move);
  }

};
