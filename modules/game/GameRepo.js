const GameRepo = {
  insertDenormalized(game) {
    console.log('insert denormalized');
    return Promise.resolve();
  }
};

module.exports = GameRepo;
