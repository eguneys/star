var async = require('async');

var { Open, OptionFuResult, negotiate } = require('./StarController');
var { Socket } = require('./StarSocket');

var { getSocketUid } = require('./RequestGetter');

var { PlayerRef } = require('../modules/game/Pov');

var Env = require('../Env');

var env = Env.round();

exports.websocketPlayer = Socket((ws, ctx) => {
  var { fullId } = ctx.req.params;
  proxyPov(fullId).then(pov => {
    if (pov) {
      const uid = getSocketUid("sri", ctx);
      if (uid) {
        requestAiMove(pov).finally(_ => {
          env.socketHandler.player(ws, pov, uid, ctx.me);
        });        
      } else ws.terminate();
    } else {
      ws.terminate();
    }
  });
  
});

function requestAiMove(pov) {
  if (pov.game.playableByAi()) {
    return Env.fishnet.player(pov.game);
  } else {
    return Promise.resolve();
  }
}

exports.player = Open((res, ctx) => {
  var { fullId } = ctx.req.params;
  OptionFuResult(proxyPov(fullId), res, ctx)(pov =>
    renderPlayer(pov, res, ctx)
  );
});

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
