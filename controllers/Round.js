var async = require('async');

var { Open, OptionFuResult, negotiate } = require('./StarController');

var { PlayerRef } = require('../modules/game/Pov');

var Env = require('../Env');

var env = Env.round();


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
      async.parallel({
        data: (cb) => Env.api().roundApi.player(pov, require('../modules/api/Mobile').Api.currentVersion, ctx).then(cb.bind(null, null))
      }).then(({data}) => {
        res.render('round/player', {data});
      });
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
