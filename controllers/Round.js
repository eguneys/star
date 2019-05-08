var { Open, OptionFuResult, negotiate } = require('./StarController');

var { PlayerRef } = require('../modules/game/Pov');

var { Env } = require('../Env');

var env = Env.round;

exports.player = function(req, res) {
  var { fullId } = req.params;
  Open((ctx) => {
    OptionFuResult(proxyPov(fullId), res, ctx)(pov =>
      renderPlayer(pov, res, ctx)
    );
  })(req, res);
};

function renderPlayer(pov, res, ctx) {
  negotiate({
    html: () => {
      res.render('round/player', {});
    },
    api: (v) => {

    }}, ctx);
}

function proxyPov(fullId) {
  var ref = PlayerRef(fullId);
  return env.roundProxyGame(ref.gameId).then(game => {
    if (game) {
      return game.playerIdPov(ref.playerId);
    }
    return null;
  });
}
