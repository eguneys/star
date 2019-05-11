var { Move } = require('jscity/move');

module.exports = function Player(fishnetPlayer) {
  
  this.fishnet = (game, uci, proxy) => {
    if (game.playable() && game.player().isAi()) {
      var progress = applyUci(game, uci);
      if (progress) {
        return proxy.save(progress)
          .finally(_ => {
          
          }).then(_ => {
            var res;

            if (progress.game.finished()) {
              res = [];
            } else {
              if (progress.game.playableByAi()) {
                requestFishnet(progress.game);
              }
              res = progress.events;
            }
            return res;
          });
      } else {
        return Promise.reject("client error");
      }
    } else {
      return Promise.reject("Not AI turn");
    }
  };

  function requestFishnet(game) {
    if (game.playableByAi()) {
      fishnetPlayer.apply(game);
    }
  }

  function applyUci(game, uci) {
    var move = Move.apply(uci);
    if (!move) {
      return null;
    }
    const newGame = game.star.move(move);

    if (!newGame) {
      return null;
    }

    return game.update(newGame, move);
  }

};
