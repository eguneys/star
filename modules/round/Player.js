var { Move } = require('jscity/move');

module.exports = function Player(fishnetPlayer) {

  this.human = (play, pov, proxy) => {
    const { playerId, move } = play;

    const { game, side } = pov;

    if (game.playableBySide(side)) {
      var progress = applyUci(game, move);
      if (progress) {
        return proxy.save(progress).then(_ => {
          return postHumanPlay(pov, progress, move);
        });
      } else {
        return Promise.reject("client error");
      }
    } else if (game.finished()) {
      return Promise.reject(`${pov} game is finished`);
    } else if (!game.turnOfSide(side)) {
      return Promise.reject(`${pov} not your turn`);
    }


    return Promise.reject(`${pov} move refused for some reason`);
  };

  function postHumanPlay(pov, progress, move) {
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
  }
  
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
