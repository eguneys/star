var Random = require('../common/Random');

var Pov = require('./Pov');

const Status = {
  Started: 'started'
};

function Game({id, player1, player2, createdAt}) {
  this.id = id;
  this.createdAt = createdAt;


  this.players = {
    'player1': player1,
    'player2': player2
  };
  
  this.player = (side) => this.players[side];
  this.playerById = (playerId) => this.players.find(_ => _.id === playerId);

  this.fullIdOf = (side) => `${id}${this.player(side).id}`;

  this.started = () => this.status === Status.Started;

  this.start = () => {
    if (this.started) return this;
    this.status = Status.Started;
    return this;
  };

  this.playerIdPov = (playerId) => {
    var _ = this.playerById(playerId);
    if (_) {
      return Pov(this, _);
    }
    return null;
  };
}

Game.takeGameId = (fullId) => fullId.slice(0, 8);
Game.takePlayerId = (fullId) => fullId.slice(8);

Game.make = function(player1, player2) {
  return new Game({
    id: Random.nextString(8),
    player1,
    player2,
    createdAt: Date.now()
  });
};

module.exports = Game;
