var Hook = require('../lobby/Hook');

var Player = require('../game/Player');
var Game = require('../game/Game');
var Pov = require('../game/Pov');
var { Game: StarGame } = require('jscity');

module.exports = function AiConfig(mode, side) {
  this.mode = mode;
  this.side = side;
  this.level = 1;

  this.fenGame = (builder) => {
    var starGame = StarGame.make();

    var game = builder(starGame);
    return game;
  };


  this.game = (user) => this.fenGame(starGame => {
    var game = Game
        .make(starGame,
              aiOrPlayer('player1', user),
              aiOrPlayer('player2', user),
             ).start();
    return game;
  });
  
  this.pov = (user) => Pov.bySide(this.game(user), this.side);

  var aiOrPlayer = (s, user) => {
    if (s === this.side) {
      return Player.make(s, user);
    } else {
      return Player.makeAi(s, this.level);
    }
  };
};
