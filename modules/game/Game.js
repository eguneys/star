var Random = require('../common/Random');

var { Status } = require('jscity');

var Event = require('./Event');

function Game({id, player1, player2, status, star, createdAt}) {
  this.id = id;
  this.status = status;
  this.player1 = player1;
  this.player2 = player2;
  this.star = star;
  this.createdAt = createdAt;


  this.board = () => ({
    streaks: this.star.streaks,
    tolls: this.star.tolls,
    players: this.star.players,
    prompt: this.star.prompt,
  });
  this.turns = () => this.star.turns;

  this.players = [
    player1,
    player2
  ];
  
  this.playerBySide = (side) => (side === 'player1')?this.player1:this.player2;
  this.playerById = (playerId) => this.players.find(_ => _.id === playerId);

  this.player = () => this.playerBySide(this.turnSide());

  this.turnSide = () => this.star.player();

  this.turnOf = (p) => p === this.player();

  this.fullIdOf = (side) => `${id}${this.player(side).id}`;

  this.start = () => {
    if (this.started()) return this;
    this.status = Status.Started;
    return this;
  };

  this.finished = () => this.status.id >= Status.VariantEnd.id;

  this.started = () => this.status.id >= Status.Started.id;

  this.playable = () => this.status.id < Status.Aborted.id;

  this.playableBy = (p) => this.playable() && this.turnOf(p);

  this.playableByAi = () => this.playable() && this.player().isAi();

  this.playerIdPov = (playerId) => {
    var _ = this.playerById(playerId);
    if (_) {
      return Pov.byPlayer(this, _);
    }
    return null;
  };

  this.update = (game, move) => {
    
    var events = [Event.Move(move, game)];
    

    return {
      game: this,
      events
    };

  };
}

Game.takeGameId = (fullId) => fullId.slice(0, 8);
Game.takePlayerId = (fullId) => fullId.slice(8);

Game.make = function(star, player1, player2) {
  return new Game({
    id: Random.nextString(8),
    player1,
    player2,
    star,
    status: Status.Created,
    createdAt: Date.now()
  });
};

module.exports = Game;

// https://stackoverflow.com/questions/10869276/how-to-deal-with-cyclic-dependencies-in-node-js
var Pov = require('./Pov');
