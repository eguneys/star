var Env = require('./Env');
var { gameBSONHandler } = require('./BSONHandlers');

var GameDiff = require('./GameDiff');
var { Fields: F } = require('./BSONHandlers');

const GameRepo = (function() {

  var coll = Env.current().gameColl;

  return {
    game(gameId) {
      return coll.byId(gameId,
                       gameBSONHandler.read);
    },
    save(progress) {
      return this.saveDiff(progress.game, GameDiff(progress.game));
    },

    saveDiff(game, diff) {
      var { sets, unsets } = diff;
      return coll
        .updateOne({ _id: game.id },
                   { ...nonEmptyMod('$set', sets), ...nonEmptyMod('$unset', unsets) });
    },

    insertDenormalized(game) {
      var bson = gameBSONHandler.write(game);
      
      return coll.insertOne(bson);
    },

    finish(id, winner, status) {
      return coll
        .updateOne({ _id: id },
                   {...nonEmptyMod("$set", {
                     [F.Game.winnerSide]: winner,
                     [F.Game.status]: status.id
                   })});
    }

  };

  function nonEmptyMod(mod, doc) {
    if (Object.keys(doc).length === 0) {
      return {};
    } else return { [mod]: doc };
  }
})();

module.exports = GameRepo;
