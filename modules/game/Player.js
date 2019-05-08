var Random = require('../common/Random');

function Player({id, side}) {
  this.id = id;
  this.side = side;
}

Player.make = function(side) {
  return new Player({
    id: Random.nextString(4),
    side
  });
};

module.exports = Player;
