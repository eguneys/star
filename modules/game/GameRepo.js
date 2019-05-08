const GameRepo = {

  game(gameId) {
    return Promise.resolve(null);
  },

  insertDenormalized(game) {
    console.log('insert denormalized');
    return Promise.resolve();
  }
};

module.exports = GameRepo;
