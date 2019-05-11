var Hook = require('../lobby/Hook');

var Player = require('../game/Player');
var Game = require('../game/Game');
var Pov = require('../game/Pov');
var { Game: StarGame } = require('jscity');

module.exports = function AiConfig(mode, side) {
  this.mode = mode;
  this.level = 1;

  this.fenGame = (builder) => {
    var starGame = StarGame.make();

    var game = builder(starGame);
    return game;
  };


  this.game = (user) => this.fenGame(starGame => {
    var game = Game
        .make(starGame,
              Player.makeAi('player1', this.level),
              Player.make('player2', user)
             ).start();
    return game;
  });
  
  this.pov = (user) => Pov.bySide(this.game(user), side);
};
