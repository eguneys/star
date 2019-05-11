var Env = require('./Env');
var { gameBSONHandler } = require('./BSONHandlers');

const GameRepo = (function() {

  var coll = Env.current().gameColl;

  return {
    game(gameId) {
      return coll.byId(gameId,
                       gameBSONHandler.read);
    },
    save(progress) {
      return Promise
        .resolve('gamerepo save progress');
    },

    insertDenormalized(game) {
      var bson = gameBSONHandler.write(game);
      
      return coll.insert(bson);
    }
  };
})();

module.exports = GameRepo;
