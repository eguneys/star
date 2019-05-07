var Game = require('../game/Game');
var GameRepo = require('../game/GameRepo');
var { JoinHook } = require('./messageApi');

function apply(hook, uid) {
  if (canJoin(hook)) return join(hook, uid);
  return Promise.reject(`user cannot bite ${hook}`);
}

function join(hook, uid) {
  var game = makeGame(hook);
  return GameRepo.insertDenormalized(game).then(() => {
    return JoinHook(uid, hook, game);
  });
}

function makeGame(hook) {
  return Game.make().start();
}

function canJoin(hook) {
  return true;
}

module.exports = {
  apply,
  join,
  canJoin
};
