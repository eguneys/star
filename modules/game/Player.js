var Random = require('../common/Random');

function Player({id, side, aiLevel}) {
  this.id = id;
  this.side = side;
  this.aiLevel = aiLevel;

  this.isAi = () => aiLevel;
}

Player.makeAi = function(side, aiLevel) {
  return new Player({
    id: Random.nextString(4),
    side,
    aiLevel
  });
};

Player.make = function(side) {
  return new Player({
    id: Random.nextString(4),
    side
  });
};

module.exports = Player;
