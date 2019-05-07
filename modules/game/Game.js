var Random = require('../common/Random');

const Status = {
  Started: 'started'
};

function Game({id, createdAt}) {
  this.id = id;
  this.createdAt = createdAt;

  this.started = () => this.status === Status.Started;

  this.start = () => {
    if (this.started) return this;
    this.status = Status.Started;
    return this;
  };
}

Game.make = function() {
  return new Game({
    id: Random.nextString(8),
    createdAt: Date.now()
  });
};

module.exports = Game;
