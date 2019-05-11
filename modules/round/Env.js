var { lazyVal } = require('../common/LazyVal');
var config = require('config');

var DuctMap = require('../hub/DuctMap');

var History = require('./History');

var Player = require('./Player');
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
      var duct = new Round(id, player, socketMap);
      return duct;
    },
    ActiveTtl
  );


  starBus.subscribeFuns({
    roundMapTell: (msg) => {
      switch(msg.type) {
      case 'tell':
        roundMap.tell(msg.id, msg.msg);
        return true;
      }
      return false;
    }
  });

  var player = new Player();
  
  this.roundProxyGame = (gameId) => {
    var game = roundMap.getOrMake(gameId).getGame();
    if (!game) {
      roundMap.kill(gameId);
    }
    
    return game;
  };

  var socketMap = SocketMap.make({
    makeHistory: History.apply(),
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
