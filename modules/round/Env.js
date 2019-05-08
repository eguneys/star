var { lazyVal } = require('../common/LazyVal');
var config = require('config');

var DuctMap = require('../hub/DuctMap');

var Round = require('./Round');

function Env(config, db) {

  var ActiveTtl = config.get("active.ttl");

  var roundMap = new DuctMap(
    id => {
      var duct = new Round(id);
      return duct;
    },
    ActiveTtl
  );
  
  this.roundProxyGame = (gameId) => {
    var game = roundMap.getOrMake(gameId).getGame();
    if (!game) {
      roundMap.kill(gameId);
    }
    
    return game;
  };
};

module.exports = {
  current: lazyVal(() => 
    new Env(config.get("round"),
            require('../db/Env').current()
           ))
};
