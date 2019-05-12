var { Move } = require('jscity/move');

module.exports = function Player(fishnetPlayer,
                                 finisher) {

  this.human = (play, pov, proxy) => {
    const { playerId, move } = play;

    const { game, side } = pov;

    if (game.playableBySide(side)) {
      var progress = applyUci(game, move);
      if (progress) {
        return proxy.save(progress).then(_ => {
          return postHumanPlay(pov, progress, move, proxy);
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

  function postHumanPlay(pov, progress, move, proxy) {
    var res;
    if (progress.game.finished()) {
      res = moveFinish(progress.game,
                       pov.side,
                       proxy)
        .then(_ => [...progress.events, ..._]);
    } else {
      if (progress.game.playableByAi()) {
        requestFishnet(progress.game);
      }
      res = Promise.resolve(progress.events);
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
              res = moveFinish(progress.game,
                               game.turnSide(),
                               proxy)
                .then(_ => [...progress.events, ..._]);
            } else {
              if (progress.game.playableByAi()) {
                requestFishnet(progress.game);
              }
              res = Promise.resolve(progress.events);
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

  function applyUci(game, move) {
    const newGame = game.star.move(move);

    if (!newGame) {
      return null;
    }

    return game.update(newGame, move);
  }

  function moveFinish(game, side, proxy) {
    return finisher.other(game, game.star.winner, proxy);
  }

};
