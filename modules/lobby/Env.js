var config = require('config');
var LobbySocket = require('./LobbySocket');
var SocketHandler = require('./SocketHandler');

function Env(config,
             starBus) {
  var SocketUidTtl = config.get("socket.uid.ttl");
  
  var socket = new LobbySocket(SocketUidTtl, starBus);

  this.socketHandler = new SocketHandler(socket);

  starBus.subscribe(this.socketHandler, 'nbMembers', 'nbRounds');
}

module.exports = {
  current: new Env(config.get("lobby"),
                   require('../common/ExpressApp').starBus)
};
