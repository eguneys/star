var { lazyVal } = require('../common/LazyVal');
var config = require('config');

function Env(config, db) {
  var CollectionGame = config.get('collection.game');

  this.gameColl = db.coll(CollectionGame);
}

module.exports = {
  current: lazyVal(() =>
    new Env(config.get("game"),
            require('../db/Env').current()
           ))
};

