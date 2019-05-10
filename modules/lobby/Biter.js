var Player = require('../game/Player');
var Game = require('../game/Game');
var GameRepo = require('../game/GameRepo');
var { JoinHook } = require('./messageApi');

var StarGame = require('jscity').Game;

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
  return Game
    .make(StarGame.make(
      
    ),
          Player.make('player1'),
          Player.make('player2'))
    .start();
}

function canJoin(hook) {
  return true;
}

module.exports = {
  apply,
  join,
  canJoin
};
