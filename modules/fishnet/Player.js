var Work = require('./Work');

module.exports = function Player(moveDb) {
  
  this.apply = (game) => {
    return makeWork(game).then(moveDb.add);
  };


  function makeWork(game) {
    if (game.playable()) {
      var work = Work.Move(
        Work.makeId(),
        Work.Game(game.id, game)
      );                   
      
      return Promise.resolve(work);
    } else {
      return Promise.reject("invalid game move");
    }
  }
};
