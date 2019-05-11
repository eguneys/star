var Random = require('../common/Random');

function Work() {
}

module.exports = {
  Game: (id, game) => ({
    id,
    game
  }),

  Move: (id, game) => ({
    id,
    game
  }),

  makeId: () => Random.nextString(8)
};
