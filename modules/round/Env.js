var { lazyVal } = require('../common/LazyVal');
var config = require('config');

var DuctMap = require('../hub/DuctMap');

var Round = require('./Round');
var JsonView = require('./JsonView');
var SocketMap = require('./SocketMap');
var SocketHandler = require('./SocketHandler');

function Env(config, starBus, db) {

  var ActiveTtl = config.get("active.ttl");

  var SocketTimeout = config.get("socket.timeout");
  var UidTimeout = config.get("uid.timeout");
  var PlayerDisconnectTimeout = config.get("player.disconnect.timeout");

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

  var socketMap = SocketMap.make({
    starBus: starBus,
    socketTimeout: SocketTimeout,
    uidTtl: UidTimeout,
    disconnectTimeout: PlayerDisconnectTimeout
  });

  this.socketHandler = new SocketHandler(
    roundMap,
    socketMap
  );

  const getSocketStatus = (gameId) => {
    return Promise.resolve({});
  };

  this.jsonView = new JsonView(
    getSocketStatus
  );
};

module.exports = {
  current: lazyVal(() => 
    new Env(config.get("round"),
            require('../common/ExpressApp').starBus,
            require('../db/Env').current()))
};
