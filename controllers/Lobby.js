var { Open, negotiate } = require('./StarController');
var { SocketOption } = require('./StarSocket');

var { getSocketUid } = require('./RequestGetter');

var { Env } = require('../Env');

exports.home = Open((res, ctx) => {
  negotiate({
    html: () => {
      res.render('lobby/home', { title: "", data: {}});
    }, api: (v) => {
      
    }}, ctx);
});

exports.socket = SocketOption((ws, ctx) => {
  const uid = getSocketUid("sri", ctx);
  if (!uid) return Promise.resolve(false);
  return Env.lobby.socketHandler(ws, uid, ctx.me);
});
